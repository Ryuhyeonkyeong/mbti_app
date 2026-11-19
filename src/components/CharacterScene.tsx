"use client";

import type { MutableRefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import type * as THREE from "three";
import type { MbtiTypeCode } from "@/data/types";
import CharacterModel from "./CharacterModel";

// 16가지 유형 캐릭터 중 하나를 투명 배경 3D 캔버스에 띄우는 컴포넌트입니다
export default function CharacterScene({
  typeCode,
  exportRef,
}: {
  typeCode: MbtiTypeCode;
  exportRef?: MutableRefObject<THREE.Group | null>;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.42, 4.05], fov: 40 }}
      gl={{ alpha: true, antialias: true }}
      style={{ background: "transparent" }}
    >
      {/* 인터넷 환경맵(HDR) 없이 코드로 만든 부드러운 조명만 사용합니다 */}
      <ambientLight intensity={0.85} />
      <hemisphereLight args={["#fff8f0", "#e6d8f5", 0.65]} />
      <directionalLight
        position={[2.5, 4.5, 3.5]}
        intensity={1.1}
        castShadow
        shadow-mapSize={[256, 256]}
        shadow-bias={-0.0005}
      />
      <directionalLight
        position={[-2.5, 2, -2]}
        intensity={0.45}
        color="#e9d8fd"
      />

      {/* 전달받은 유형 코드에 맞는 3D 동물 캐릭터 */}
      <CharacterModel typeCode={typeCode} exportRef={exportRef} />

      {/* 바닥에 부드러운 그림자를 그려주는 투명 바닥면입니다 */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.92, 0]}
        receiveShadow
      >
        <circleGeometry args={[1.6, 48]} />
        <shadowMaterial transparent opacity={0.18} />
      </mesh>

      {/* 마우스 드래그/터치로 회전만 가능하고 확대/축소와 이동은 막습니다 */}
      <OrbitControls
        target={[0, 0.22, 0]}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.85}
      />
    </Canvas>
  );
}
