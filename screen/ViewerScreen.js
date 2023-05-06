import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Button } from "react-native";
import Expo from "expo";
import { captureRef } from "react-native-view-shot";
import Icon from "react-native-vector-icons/FontAwesome";
import * as FileSystem from "expo-file-system";
import {
  Scene,
  Mesh,
  PerspectiveCamera,
  SphereGeometry,
  Vector3,
  MeshMatcapMaterial,
} from "three";
import Loading from "../components/Loading";
import ExpoTHREE, { Renderer } from "expo-three";
import { GLView } from "expo-gl";
import { parsePdbFunction } from "../components/parsePdb";
import styled from "styled-components";
import { CylinderGeometry } from "three";
import OrbitControlsView from "../components/OrbitControlsView";
import CustomModal from "../components/Modal";
import cpkData from "../utils/data.json";
import * as MediaLibrary from "expo-media-library";

const ViewerScreen = ({ route, navigation }) => {
  const { ligand } = route.params;
  const [start, setStart] = useState();
  const [geomet, setGeometry] = useState();
  const [visible, setVisible] = useState(false);
  const [objects, setObjects] = useState([]);
  const [isSphere, setIsSphere] = useState(true);
  const [datatoshow, setDatatoshow] = useState();
  const [aspectRatio, setAspectratop] = useState([]);
  const cameraRef = useRef();
  const [data, setData] = useState();
  const glViewRef = useRef(null);
  const orbitRef = useRef(null);
  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermission();
  }

  const getData = async () => {
    let res = await parsePdbFunction(ligand);
    setData(res);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",

            marginRight: 10,
            // alignItems: "center",
            justifyContent: "space-between",
            width: 60,
          }}
        >
          <Icon
            name="download"
            solid
            size={25}
            color="#e97560"
            onPress={() => shareOrSave("save")}
          />
          <Icon
            name="share-alt"
            // solid
            size={25}
            color="#e97560"
            onPress={() => shareOrSave("share")}
            title="Save"
          />
        </View>
      ),
      title: `Molucule Name :${ligand}`,
    });
  }, [navigation]);

  const handleZoomIn = () => {
    if (cameraRef) {
      if (orbitRef.current) {
        const controls = orbitRef.current;
        controls.getControls().dollyOut(0.95 ** 1.0);
        controls.getControls().update();
      }
    }
  };

  const handleZoomOut = () => {
    if (cameraRef) {
      if (orbitRef.current) {
        const controls = orbitRef.current;
        controls.getControls().dollyIn(0.95 ** 1.0);
        controls.getControls().update();
      }
    }
  };

  const shareOrSave = async (value) => {
    const snapshot = await captureRef(glViewRef, {
      format: "png",
      quality: 1,
    });
    console.log("shareOrSave", value);
    if (value === "save") {
      await MediaLibrary.saveToLibraryAsync(snapshot, "custumesidepicture.png")
        .then((res) => {
          console.log(res);
          alert("Saved!");
        })
        .catch((err) => {
          console.log(err);
        });

      // if (snapshot) {
      //   alert("Saved!");
      // }
    }
    if (value === "share") {
    }
  };

  const intersect = ({ nativeEvent }) => {
    const { locationX: x, locationY: y } = nativeEvent;
    const mouse3D = new THREE.Vector3(
      (x / aspectRatio.width) * 2 - 1,
      -(y / aspectRatio.height) * 2 + 1,
      0.5
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse3D, cameraRef.current);
    // console.log(objects);
    const intersects = raycaster.intersectObjects(objects);
    // const intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
      // console.log(intersects[0].object.name);
      if (intersects[0].object.name) {
        setDatatoshow(JSON.parse(intersects[0].object.name));
        setVisible(true);
      }
    }
  };

  useEffect(() => {
    if (isSphere) setGeometry(new SphereGeometry(0.3, 32, 32));
    else setGeometry(new THREE.BoxGeometry(0.3, 0.3, 0.3));
  }, [isSphere]);
  const onContextCreate = async (gl) => {
    // three.js implementation.
    const scene = new Scene();
    scene.background = new THREE.Color(0xffffff);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 10, 0); // position above the scene
    directionalLight.target.position.set(0, 0, 0);
    scene.add(directionalLight);
    cameraRef.current = new PerspectiveCamera(
      50,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    cameraRef.current.position.z = 30;
    gl.canvas = {
      width: gl.drawingBufferWidth,
      height: gl.drawingBufferHeight,
    };
    const renderer = new Renderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    const render = () => {
      requestAnimationFrame(render);
      renderer.render(scene, cameraRef.current);
      gl.endFrameEXP();
    };

    if (data) {
      const bondMaterial = new MeshMatcapMaterial({
        // color: "green",
      });
      const atoms = [];
      const bonds = [];
      data.atoms.forEach((atom) => {
        const dataatom = cpkData[atom.element];
        const atomMaterial = new MeshMatcapMaterial({
          color: `#${dataatom?.Jmol || "FFF"}`,
        });
        // const geometry = geomet;
        // const geometry = new SphereGeometry(0.3, 32, 32);
        const mesh = new Mesh(geomet, atomMaterial);
        mesh.position.set(atom.x, atom.y, atom.z);
        mesh.name = JSON.stringify({
          name: dataatom.name,
          element: atom.element,
          discoverdBy: dataatom.discoverd_by,
          phase: dataatom.phase,
        });
        scene.add(mesh);
        setObjects((prev) => [...prev, mesh]);
        atoms.push(mesh);
      });
      data.connectData.forEach((bond, index) => {
        bond.forEach((item, key, arr) => {
          if (key === 0) return;
          const startAtom = data.serials[arr[0]];
          const endAtom = data.serials[item];
          const distance = Math.sqrt(
            (endAtom.x - startAtom.x) ** 2 +
              (endAtom.y - startAtom.y) ** 2 +
              (endAtom.z - startAtom.z) ** 2
          );
          const geometry = new CylinderGeometry(0.1, 0.1, distance, 32);
          geometry.translate(0, distance / 2, 0);
          geometry.rotateX(Math.PI / 2);
          const mesh = new Mesh(geometry, bondMaterial);

          mesh.position.set(startAtom.x, startAtom.y, startAtom.z);
          mesh.lookAt(new Vector3(endAtom.x, endAtom.y, endAtom.z));
          scene.add(mesh);
          setObjects((prev) => [...prev, mesh]);
          bonds.push(mesh);
        });
      });
    } else {
      console.log("errot dat");
    }
    render();
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Container>
      {(data) ? (
        <View style={{ display: "flex", flex: 1 }}>
          <OrbitControlsView
            key={isSphere}
            ref={orbitRef}
            style={{ flex: 1 }}
            camera={cameraRef.current}
            enableZoom={true}
            onTouchStart={(event) => {
              const { locationX: x, locationY: y } = event.nativeEvent;
              setStart({ x, y });
            }}
            onTouchEndCapture={(event) => {
              const { locationX: x, locationY: y } = event.nativeEvent;
              if (x == start.x && y == start.y) intersect(event);
            }}
            onLayout={(event) => {
              var { width, height } = event.nativeEvent.layout;
              setAspectratop({
                width: width,
                height: height,
              });
            }}
          >
            <GLView
              onContextCreate={onContextCreate}
              style={{ flex: 1 }}
              ref={glViewRef}
            />
          </OrbitControlsView>
          <BottonsWrraper>
            <BottonStyle title="-" onPress={handleZoomIn}>
              <TextStyle>+</TextStyle>
            </BottonStyle>
            <BottonStyle title="+" onPress={handleZoomOut}>
              <TextStyle>-</TextStyle>
            </BottonStyle>
            <BottonStyle title="Sphere" onPress={() => setIsSphere(true)}>
              <TextStyle>Sphere</TextStyle>
            </BottonStyle>
            <BottonStyle title="Cube" onPress={() => setIsSphere(false)}>
              <TextStyle>Cube</TextStyle>
            </BottonStyle>
          </BottonsWrraper>
        </View>
      ) : (
        <Loading />
      )}
      {datatoshow && (
        <CustomModal
          data={datatoshow}
          visible={visible}
          setVisible={setVisible}
        />
      )}
    </Container>
  );
};

const ButtonStyle1 = {
  minWidth: 100,
  backgroundColor: "red",
  borderWidth: 10,
  borderColor: "red",
  justifyContent: "center",
  alignItems: "center",
  padding: 10,
};

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;
const BottonsWrraper = styled.View`
  width: 100%;
  /* background-color: #FFf; */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 100;
  padding-top: 10px;
`;

const BottonsWrraper2 = styled.View`
  width: 100%;
  /* background-color: #FFf; */
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 100;
  padding-top: 10px;
`;

const BottonStyle = styled.TouchableOpacity`
  min-width: 40px;
  min-height: 40px;
  margin-bottom: 10px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e97560;
  border-radius: 12px;
  padding: 0px 10px 0px 10px;
`;

const TextStyle = styled.Text`
  color: #ffff;
  font-size: 25px;
`;

export default ViewerScreen;
