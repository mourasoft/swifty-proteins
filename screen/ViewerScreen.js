import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import Expo from "expo";
import {
  Scene,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  SphereBufferGeometry,
  SphereGeometry,
} from "three";
import ExpoTHREE, { Renderer } from "expo-three";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { StatusBar } from "expo-status-bar";
import { parsePdbFunction } from "../components/parsePdb";
import styled from "styled-components";

const ViewerScreen = () => {
  // const [data, setData] = useState();
  // useEffect(()=>{
  //     console.log('===========================================================================');
  //     console.log(dataparsed);
  //     console.log('===========================================================================');
  //     setData(dataparsed)
  //   }
  //   )
  // },[])
  const onContextCreate = async (gl) => {
    // three.js implementation.
    parsePdbFunction('011').then((data) => {
      const scene = new Scene();
      const camera = new PerspectiveCamera(
        75,
        gl.drawingBufferWidth / gl.drawingBufferHeight,
        0.1,
        1000
      );
      gl.canvas = {
        width: gl.drawingBufferWidth,
        height: gl.drawingBufferHeight,
      };

      // set camera position away from sphere
      camera.position.z = 5;

      const renderer = new Renderer({ gl });
      // set size of buffer to be equal to drawing buffer width
      renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

      // create render function
      const render = () => {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
        gl.endFrameEXP();
      };

      if (data) {
        // create atom material
        const atomMaterial = new MeshBasicMaterial({
          color: "red",
        });

        // create bond material
        const bondMaterial = new MeshBasicMaterial({
          color: "grey",
        });

        // create atoms and bonds
        const atoms = [];
        const bonds = [];
        data.atoms.forEach((atom) => {
          const geometry = new SphereGeometry(0.2, 32, 32);
          const mesh = new Mesh(geometry, atomMaterial);
          mesh.position.set(atom.x, atom.y, atom.z);
          scene.add(mesh);
          atoms.push(mesh);
        });
        data.connectData.forEach((bond) => {
          const startAtom = atoms.find(atom => atom.userData.serial === parseInt(bond[0]));
          const endAtom = atoms.find(atom => atom.userData.serial === parseInt(bond[1]));

          const distance = startAtom.position.distanceTo(endAtom.position);
          const geometry = new CylinderGeometry(0.1, 0.1, distance, 32);
          const mesh = new Mesh(geometry, bondMaterial);

          mesh.position.set(
            (startAtom.position.x + endAtom.position.x) / 2,
            (startAtom.position.y + endAtom.position.y) / 2,
            (startAtom.position.z + endAtom.position.z) / 2
          );

          mesh.lookAt(endAtom.position);
          scene.add(mesh);
          bonds.push(mesh);
        });
        // data.connectData.forEach((bond) => {
        //   console.log('-----------------------------')
        //   console.log(bond);
        //   console.log('-----------------------------')
        //   const startAtom = atoms[bond.startAtomIndex];
        //   const endAtom = atoms[bond.endAtomIndex];
        //   const distance = startAtom.position.distanceTo(endAtom.position);
        //   const geometry = new CylinderGeometry(0.1, 0.1, distance, 32);
        //   const mesh = new Mesh(geometry, bondMaterial);
        //   mesh.position.set(
        //    (startAtom.position.x + endAtom.position.x) / 2,
        //     (startAtom.position.y + endAtom.position.y) / 2,
        //     (startAtom.position.z + endAtom.position.z) / 2
        //   );
        //   mesh.lookAt(endAtom.position);
        //   scene.add(mesh);
        //   bonds.push(mesh);
        // });
      }

      // call render
      render();
    })
  };

  return (
    <Container>
      {<GLView
        onContextCreate={onContextCreate}
        // set height and width of GLView
        style={{ width: 400, height: 400 }}
      />}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export default ViewerScreen;