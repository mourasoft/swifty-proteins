import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import Expo from "expo";
import {
  Scene,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  SphereBufferGeometry,
  SphereGeometry,
  Vector3,
  MeshStandardMaterial,
  DirectionalLight,
} from "three";
import ExpoTHREE, { Renderer } from "expo-three";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { StatusBar } from "expo-status-bar";
import { parsePdbFunction } from "../components/parsePdb";
import styled from "styled-components";
import { CylinderGeometry } from "three";
import OrbitControlsView from "../components/OrbitControlsView";

const ViewerScreen = () => {
  const cameraRef = useRef(new PerspectiveCamera(
    50,
    1100 / 1100,
    0.1,
    1000
  ));
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState()
  const getData = async () => {
    let res = await parsePdbFunction('18Q');
    console.log(res);
    setData(res)
  }
  // cameraRef.current =  
  const onContextCreate = async (gl) => {
    // three.js implementation.
    const scene = new Scene();
    const directionalLight = new DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 3, 3);
    scene.add(directionalLight);
    // cameraRef.current = new PerspectiveCamera(
    //   50,
    //   gl.drawingBufferWidth / gl.drawingBufferHeight,
    //   0.1,
    //   1000
    // );
    cameraRef.current.position.z = 15;
    // console.log(gl.drawingBufferWidth , gl.drawingBufferHeight);
    gl.canvas = {
      width: gl.drawingBufferWidth,
      height: gl.drawingBufferHeight,
    };

    // set camera position away from sphere
    const renderer = new Renderer({ gl });
    // set size of buffer to be equal to drawing buffer width
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    // create render function
    const render = () => {
      requestAnimationFrame(render);
      renderer.render(scene, cameraRef.current);
      gl.endFrameEXP();
    };

    if (data) {
      // create atom material
      const atomMaterial = new MeshStandardMaterial({
        color: "red",
      });

      // create bond material
      const bondMaterial = new MeshStandardMaterial({
        color: "green",
      });
      const atoms = [];
      const bonds = [];
      data.atoms.forEach((atom) => {
        const geometry = new SphereGeometry(0.3, 32, 32);
        const mesh = new Mesh(geometry, atomMaterial);
        mesh.position.set(atom.x, atom.y, atom.z);
        scene.add(mesh);
        atoms.push(mesh);
      });
      data.connectData.forEach((bond, index) => {
        bond.forEach((item, key, arr) => {
          if (key === 0)
            return;
          const startAtom = data.serials[arr[0]];
          const endAtom = data.serials[item];
          const distance = Math.sqrt((endAtom.x - startAtom.x) ** 2 + (endAtom.y - startAtom.y) ** 2 + (endAtom.z - startAtom.z) ** 2);
          const geometry = new CylinderGeometry(0.1, 0.1, distance, 32);
          geometry.translate(0, distance / 2, 0);
          geometry.rotateX(Math.PI / 2);
          const mesh = new Mesh(geometry, bondMaterial);

          mesh.position.set(
            (startAtom.x),
            (startAtom.y),
            (startAtom.z)
          );
          mesh.lookAt(new Vector3(endAtom.x, endAtom.y, endAtom.z)); // Orient towards end atom

          scene.add(mesh);
          bonds.push(mesh);
        })
      });
    }
    else {
      console.log('errot dat');
    }
    render();
  };
  useEffect(() => {
    getData()
  }, [])
  useEffect(() => {
    // console.log(cameraRef.current);
    // setTimeout(() => {
      setLoading(prev => !prev);
      // setLoading(!loading);
    // }, (1000));
    // }, (1000));
  }, [])
  return (
    <Container>
      {
       (data && cameraRef?.current) ?
          <OrbitControlsView  style={{display: 'flex', flex: 1 }} camera={cameraRef.current}>
            <GLView
              onContextCreate={onContextCreate}
              // set height and width of GLView
              style={{ flex: 1 }}
            />
           </OrbitControlsView>
          : <Text>Loading ....aa</Text>
      }
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #FFf;
`;

export default ViewerScreen;
