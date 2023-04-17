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
  MeshMatcapMaterial,
  Vector3,
} from "three";
import ExpoTHREE, { Renderer } from "expo-three";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { StatusBar } from "expo-status-bar";
import { parsePdbFunction } from "../components/parsePdb";
import styled from "styled-components";
import { CylinderGeometry } from "three";

const ViewerScreen = () => {
  const onContextCreate = async (gl) => {
    // three.js implementation.
    parsePdbFunction("011").then((data) => {
      const scene = new Scene();
      const camera = new PerspectiveCamera(
        55,
        gl.drawingBufferWidth / gl.drawingBufferHeight,
        0.1,
        1000
      );
      gl.canvas = {
        width: gl.drawingBufferWidth,
        height: gl.drawingBufferHeight,
      };
      camera.position.z = 15;
      const renderer = new Renderer({ gl });
      renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);
      const render = () => {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
        gl.endFrameEXP();
      };

      if (data) {
        const atomMaterial = new MeshMatcapMaterial({
          color: "red",
        });

        const bondMaterial = new MeshBasicMaterial({
          color: "green",
        });

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
          const startAtom = data.serials[bond[0]];
          const endAtom = data.serials[bond[1]];
          const distance = Math.sqrt(
            (endAtom.x - startAtom.x) ** 2 +
              (endAtom.y - startAtom.y) ** 2 +
              (endAtom.z - startAtom.z) ** 2
          );
          const direction = new Vector3(
            endAtom.x - startAtom.x,
            endAtom.y - startAtom.y,
            endAtom.z - startAtom.z
          ).normalize();
          const geometry = new CylinderGeometry(0.1, 0.1, distance, 32);
          const mesh = new Mesh(geometry, bondMaterial);
          mesh.position.set(startAtom.x, startAtom.y, startAtom.z);
          // mesh.position.set(
          //   (startAtom.x + endAtom.x) ,
          //   (startAtom.y + endAtom.y) ,
          //   (startAtom.z + endAtom.z) 
          // );
          mesh.lookAt(endAtom.x, endAtom.y, endAtom.z);
          scene.add(mesh);
          bonds.push(mesh);
        });
      }
      render();
    });
  };

  return (
    <Container>
      {
        <GLView
          onContextCreate={onContextCreate}
          // set height and width of GLView
          style={{ width: 400, height: 400 }}
        />
      }
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: #fff;
`;

export default ViewerScreen;
