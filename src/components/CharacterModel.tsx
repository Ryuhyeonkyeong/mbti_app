"use client";

import { useEffect, useRef, type MutableRefObject } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { MBTI_TYPES, type MbtiTypeCode } from "@/data/types";

// 동물별 대표 색상과 보조 색상을 정의합니다 (유형 대표 색상을 바탕으로 동물 특징을 살렸습니다)
const ANIMAL_PALETTES: Record<
  MbtiTypeCode,
  { main: string; sub: string; accent: string }
> = {
  INTJ: { main: "#9b8bc7", sub: "#f5edff", accent: "#f6b94d" }, // 부엉이
  INTP: { main: "#a9cce8", sub: "#f2f8fd", accent: "#f5a6b8" }, // 고양이
  ENTJ: { main: "#e8a87c", sub: "#fff0dc", accent: "#b86b35" }, // 사자
  ENTP: { main: "#f29d52", sub: "#fff6eb", accent: "#2d2420" }, // 여우
  INFJ: { main: "#b89b7a", sub: "#f6efe4", accent: "#8c6b4f" }, // 사슴
  INFP: { main: "#f7c7d8", sub: "#fff6f9", accent: "#f59bb8" }, // 토끼
  ENFJ: { main: "#f0c18b", sub: "#fff5e6", accent: "#f2798f" }, // 강아지
  ENFP: { main: "#e09b57", sub: "#fff2df", accent: "#c97a3a" }, // 다람쥐
  ISTJ: { main: "#8db89a", sub: "#e8f5ec", accent: "#5e876a" }, // 거북이
  ISFJ: { main: "#c88a55", sub: "#fbe6cf", accent: "#f7a8b8" }, // 곰
  ESTJ: { main: "#364156", sub: "#f7f9fc", accent: "#f7a43b" }, // 펭귄
  ESFJ: { main: "#fff7fa", sub: "#fce0ec", accent: "#f5a6c3" }, // 양
  ISTP: { main: "#b89f8d", sub: "#f7ece4", accent: "#6d584b" }, // 고슴도치
  ISFP: { main: "#ffffff", sub: "#2a2830", accent: "#a3d9a5" }, // 판다
  ESTP: { main: "#c78750", sub: "#fde4c8", accent: "#f4979c" }, // 원숭이
  ESFP: { main: "#ff7477", sub: "#ffe066", accent: "#5ec2f2" }, // 앵무새
};

// 16가지 성격 유형에 맞는 2등신 3D 동물 캐릭터를 그리는 컴포넌트입니다
export default function CharacterModel({
  typeCode,
  exportRef,
}: {
  typeCode: MbtiTypeCode;
  exportRef?: MutableRefObject<THREE.Group | null>;
}) {
  const rootRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const tailRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Group>(null);
  const rightEyeRef = useRef<THREE.Group>(null);

  // GLB 내보내기에서 캐릭터 루트 그룹을 참조할 수 있게 연결합니다
  useEffect(() => {
    if (exportRef) {
      exportRef.current = rootRef.current;
    }
    return () => {
      if (exportRef) {
        exportRef.current = null;
      }
    };
  }, [exportRef, typeCode]);

  // 캐릭터를 눌렀을 때 폴짝 뛰어오르는 점프 타이머 (0 ~ 1)
  const jumpProgressRef = useRef<number>(0);

  const palette = ANIMAL_PALETTES[typeCode];
  const animal = MBTI_TYPES[typeCode].character.animal;
  const darkColor = "#221d1b";
  const cheekColor = "#f7a8b8";

  // 캐릭터를 탭/클릭하면 폴짝 뛰어오르게 합니다 (드래그 회전과 구분하기 위해 이동 거리 확인)
  const handleTap = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (e.delta > 6) return;
    jumpProgressRef.current = 0.001;
  };

  useFrame(({ clock }, delta) => {
    const t = clock.getElapsedTime();

    // 기본 숨쉬기 애니메이션
    const breath = 1 + Math.sin(t * 2.3) * 0.02;

    // 탭했을 때의 폴짝 점프 높이 계산
    let jumpOffset = 0;
    if (jumpProgressRef.current > 0) {
      jumpProgressRef.current += delta * 2.2;
      if (jumpProgressRef.current >= 1) {
        jumpProgressRef.current = 0;
      } else {
        jumpOffset = Math.sin(jumpProgressRef.current * Math.PI) * 0.42;
      }
    }

    if (rootRef.current && headRef.current) {
      // 매 프레임 회전/위치를 기본값으로 맞춘 뒤 유형별 성격 움직임을 적용합니다
      let posY = Math.sin(t * 1.8) * 0.04;
      let rotZ = 0;
      let rotY = 0;
      let headRotX = 0;
      let headRotY = 0;
      let headRotZ = 0;

      switch (typeCode) {
        case "ENFP": // 다람쥐: 신나게 통통 뛰기
          posY = Math.abs(Math.sin(t * 4.4)) * 0.13;
          break;
        case "ISTJ": // 거북이: 천천히 고개 끄덕이기
          posY = Math.sin(t * 1.2) * 0.025;
          headRotX = Math.sin(t * 1.6) * 0.09;
          break;
        case "ESFP": // 앵무새: 좌우로 흔들며 춤추기
          rotZ = Math.sin(t * 4.0) * 0.11;
          posY = Math.abs(Math.sin(t * 4.0)) * 0.06;
          break;
        case "INTJ": // 부엉이: 차분히 주위를 살피듯 고개 돌리기
          headRotY = Math.sin(t * 1.1) * 0.18;
          break;
        case "INTP": // 고양이: 고개 갸웃거리며 사색하기
          headRotZ = Math.sin(t * 1.5) * 0.08;
          break;
        case "ENTJ": // 사자: 당당하게 끄덕이기
          headRotX = Math.sin(t * 2.0) * 0.06;
          break;
        case "ENTP": // 여우: 재치 있게 좌우로 몸 비틀기
          rotY = Math.sin(t * 2.5) * 0.14;
          break;
        case "INFJ": // 사슴: 고요하고 우아하게 둥실거리기
          posY = Math.sin(t * 1.3) * 0.05;
          break;
        case "INFP": // 토끼: 포근하게 톡톡 뛰기
          posY = Math.abs(Math.sin(t * 2.8)) * 0.07;
          break;
        case "ENFJ": // 강아지: 반가워서 덩실덩실
          posY = Math.abs(Math.sin(t * 3.6)) * 0.08;
          rotZ = Math.sin(t * 3.6) * 0.06;
          break;
        case "ISFJ": // 곰: 포근하게 둥실거리기
          posY = Math.sin(t * 1.8) * 0.055;
          break;
        case "ESTJ": // 펭귄: 절도 있게 뒤뚱뒤뚱
          rotZ = Math.sin(t * 3.0) * 0.08;
          break;
        case "ESFJ": // 양: 몽글몽글 좌우 흔들기
          rotZ = Math.sin(t * 2.2) * 0.07;
          break;
        case "ISTP": // 고슴도치: 쿨하게 살짝 리듬 타기
          headRotX = Math.sin(t * 2.2) * 0.05;
          break;
        case "ISFP": // 판다: 느긋하게 좌우 살랑
          rotZ = Math.sin(t * 1.2) * 0.06;
          break;
        case "ESTP": // 원숭이: 활기차게 통통 뛰기
          posY = Math.abs(Math.sin(t * 3.8)) * 0.1;
          rotY = Math.sin(t * 2.0) * 0.1;
          break;
      }

      rootRef.current.position.y = posY + jumpOffset;
      rootRef.current.rotation.set(0, rotY, rotZ);
      rootRef.current.scale.set(breath, breath, breath);
      headRef.current.rotation.set(headRotX, headRotY, headRotZ);
    }

    // 꼬리가 있는 동물은 꼬리도 살랑살랑 흔듭니다
    if (tailRef.current) {
      const wagSpeed = typeCode === "ENFJ" ? 8 : 3.2;
      tailRef.current.rotation.y = Math.sin(t * wagSpeed) * 0.25;
    }

    // 가끔 눈을 깜빡입니다
    const blinkCycle = t % 3.6;
    const eyeScaleY = blinkCycle > 3.44 ? 0.1 : 1;
    if (leftEyeRef.current && rightEyeRef.current) {
      leftEyeRef.current.scale.y = THREE.MathUtils.lerp(
        leftEyeRef.current.scale.y,
        eyeScaleY,
        0.45
      );
      rightEyeRef.current.scale.y = THREE.MathUtils.lerp(
        rightEyeRef.current.scale.y,
        eyeScaleY,
        0.45
      );
    }
  });

  const isBird = animal === "부엉이" || animal === "펭귄" || animal === "앵무새";
  const hasRoundSnout =
    animal === "곰" ||
    animal === "사자" ||
    animal === "강아지" ||
    animal === "토끼" ||
    animal === "다람쥐" ||
    animal === "판다" ||
    animal === "원숭이" ||
    animal === "사슴" ||
    animal === "양" ||
    animal === "고양이";

  return (
    <group ref={rootRef} name="character_root" onClick={handleTap}>
      {/* ==================== 1. 공통 머리 + 동물별 머리 특징 ==================== */}
      <group ref={headRef} name="character_head" position={[0, 0.48, 0]}>
        {/* 기본 둥근 머리 */}
        <mesh castShadow scale={[1.08, 0.96, 1]}>
          <sphereGeometry args={[0.62, 20, 20]} />
          <meshStandardMaterial
            color={animal === "판다" ? "#ffffff" : palette.main}
            roughness={0.35}
            metalness={0.04}
          />
        </mesh>

        {/* 양: 머리 위 몽글몽글한 털 구름 */}
        {animal === "양" && (
          <group position={[0, 0.48, 0.05]}>
            {[-0.22, 0, 0.22].map((x, idx) => (
              <mesh key={x} castShadow position={[x, idx === 1 ? 0.08 : 0.02, 0.12]}>
                <sphereGeometry args={[0.19, 18, 18]} />
                <meshStandardMaterial color={palette.main} roughness={0.5} />
              </mesh>
            ))}
          </group>
        )}

        {/* 사자: 얼굴을 두른 풍성한 갈기 */}
        {animal === "사자" && (
          <group position={[0, 0, -0.04]}>
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i / 12) * Math.PI * 2;
              return (
                <mesh
                  key={i}
                  castShadow
                  position={[Math.cos(angle) * 0.62, Math.sin(angle) * 0.58, 0]}
                >
                  <sphereGeometry args={[0.21, 18, 18]} />
                  <meshStandardMaterial color={palette.accent} roughness={0.45} />
                </mesh>
              );
            })}
          </group>
        )}

        {/* 앵무새: 머리 위 보(벼슬) */}
        {animal === "앵무새" && (
          <group position={[0, 0.62, 0.05]}>
            <mesh castShadow position={[0, 0.06, 0]} rotation={[-0.2, 0, 0]}>
              <coneGeometry args={[0.1, 0.28, 16]} />
              <meshStandardMaterial color={palette.sub} roughness={0.35} />
            </mesh>
            <mesh castShadow position={[0, 0.02, -0.14]} rotation={[-0.5, 0, 0]}>
              <coneGeometry args={[0.08, 0.24, 16]} />
              <meshStandardMaterial color={palette.accent} roughness={0.35} />
            </mesh>
          </group>
        )}

        {/* 부엉이: 뾰족한 귀깃 + 동그란 큰 눈테 */}
        {animal === "부엉이" && (
          <>
            <mesh castShadow position={[-0.4, 0.56, 0.05]} rotation={[0, 0, 0.35]}>
              <coneGeometry args={[0.13, 0.28, 16]} />
              <meshStandardMaterial color={palette.main} roughness={0.35} />
            </mesh>
            <mesh castShadow position={[0.4, 0.56, 0.05]} rotation={[0, 0, -0.35]}>
              <coneGeometry args={[0.13, 0.28, 16]} />
              <meshStandardMaterial color={palette.main} roughness={0.35} />
            </mesh>
            {/* 큰 눈테 */}
            <mesh position={[-0.21, 0.08, 0.51]} scale={[1, 1, 0.35]}>
              <sphereGeometry args={[0.165, 16, 16]} />
              <meshStandardMaterial color={palette.sub} roughness={0.4} />
            </mesh>
            <mesh position={[0.21, 0.08, 0.51]} scale={[1, 1, 0.35]}>
              <sphereGeometry args={[0.165, 16, 16]} />
              <meshStandardMaterial color={palette.sub} roughness={0.4} />
            </mesh>
          </>
        )}

        {/* 원숭이: 밝은 크림색 얼굴 마스크 */}
        {animal === "원숭이" && (
          <mesh position={[0, -0.02, 0.46]} scale={[0.88, 0.78, 0.45]}>
            <sphereGeometry args={[0.38, 16, 16]} />
            <meshStandardMaterial color={palette.sub} roughness={0.4} />
          </mesh>
        )}

        {/* 판다: 검은 눈가 무늬 */}
        {animal === "판다" && (
          <>
            <mesh
              position={[-0.22, 0.07, 0.51]}
              rotation={[0, 0, 0.3]}
              scale={[1.2, 1.45, 0.4]}
            >
              <sphereGeometry args={[0.13, 20, 20]} />
              <meshStandardMaterial color={palette.sub} roughness={0.35} />
            </mesh>
            <mesh
              position={[0.22, 0.07, 0.51]}
              rotation={[0, 0, -0.3]}
              scale={[1.2, 1.45, 0.4]}
            >
              <sphereGeometry args={[0.13, 20, 20]} />
              <meshStandardMaterial color={palette.sub} roughness={0.35} />
            </mesh>
          </>
        )}

        {/* 귀: 동물별로 귀 모양을 다르게 그립니다 (거북이/펭귄/앵무새는 귀 없음) */}
        {(animal === "곰" || animal === "사자" || animal === "판다") && (
          <>
            <mesh castShadow position={[-0.46, 0.45, -0.02]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial
                color={animal === "판다" ? palette.sub : palette.main}
                roughness={0.35}
              />
            </mesh>
            <mesh castShadow position={[0.46, 0.45, -0.02]}>
              <sphereGeometry args={[0.2, 16, 16]} />
              <meshStandardMaterial
                color={animal === "판다" ? palette.sub : palette.main}
                roughness={0.35}
              />
            </mesh>
          </>
        )}

        {(animal === "고양이" || animal === "여우" || animal === "다람쥐") && (
          <>
            <mesh
              castShadow
              position={[-0.4, 0.54, 0]}
              rotation={[0, 0, 0.35]}
            >
              <coneGeometry
                args={[
                  animal === "여우" ? 0.2 : 0.17,
                  animal === "여우" ? 0.42 : 0.32,
                  16,
                ]}
              />
              <meshStandardMaterial color={palette.main} roughness={0.35} />
            </mesh>
            <mesh
              castShadow
              position={[0.4, 0.54, 0]}
              rotation={[0, 0, -0.35]}
            >
              <coneGeometry
                args={[
                  animal === "여우" ? 0.2 : 0.17,
                  animal === "여우" ? 0.42 : 0.32,
                  16,
                ]}
              />
              <meshStandardMaterial color={palette.main} roughness={0.35} />
            </mesh>
          </>
        )}

        {animal === "토끼" && (
          <>
            <mesh castShadow position={[-0.24, 0.78, -0.02]} rotation={[0, 0, 0.15]}>
              <capsuleGeometry args={[0.12, 0.48, 12, 16]} />
              <meshStandardMaterial color={palette.main} roughness={0.35} />
            </mesh>
            <mesh castShadow position={[0.24, 0.78, -0.02]} rotation={[0, 0, -0.15]}>
              <capsuleGeometry args={[0.12, 0.48, 12, 16]} />
              <meshStandardMaterial color={palette.main} roughness={0.35} />
            </mesh>
          </>
        )}

        {animal === "강아지" && (
          <>
            <mesh castShadow position={[-0.6, -0.02, 0.08]} rotation={[0.12, 0, 0.25]}>
              <capsuleGeometry args={[0.14, 0.42, 10, 14]} />
              <meshStandardMaterial color={palette.accent} roughness={0.35} />
            </mesh>
            <mesh castShadow position={[0.6, -0.02, 0.08]} rotation={[0.12, 0, -0.25]}>
              <capsuleGeometry args={[0.14, 0.42, 10, 14]} />
              <meshStandardMaterial color={palette.accent} roughness={0.35} />
            </mesh>
          </>
        )}

        {animal === "양" && (
          <>
            <mesh castShadow position={[-0.64, 0.1, 0]} rotation={[0, 0, Math.PI / 2.2]}>
              <capsuleGeometry args={[0.1, 0.2, 10, 14]} />
              <meshStandardMaterial color={palette.sub} roughness={0.4} />
            </mesh>
            <mesh castShadow position={[0.64, 0.1, 0]} rotation={[0, 0, -Math.PI / 2.2]}>
              <capsuleGeometry args={[0.1, 0.2, 10, 14]} />
              <meshStandardMaterial color={palette.sub} roughness={0.4} />
            </mesh>
          </>
        )}

        {animal === "원숭이" && (
          <>
            <mesh castShadow position={[-0.66, 0.05, 0]} scale={[0.85, 1, 0.5]}>
              <sphereGeometry args={[0.21, 20, 20]} />
              <meshStandardMaterial color={palette.main} roughness={0.35} />
            </mesh>
            <mesh position={[-0.66, 0.05, 0.06]} scale={[0.6, 0.72, 0.4]}>
              <sphereGeometry args={[0.18, 16, 16]} />
              <meshStandardMaterial color={palette.sub} roughness={0.4} />
            </mesh>
            <mesh castShadow position={[0.66, 0.05, 0]} scale={[0.85, 1, 0.5]}>
              <sphereGeometry args={[0.21, 20, 20]} />
              <meshStandardMaterial color={palette.main} roughness={0.35} />
            </mesh>
            <mesh position={[0.66, 0.05, 0.06]} scale={[0.6, 0.72, 0.4]}>
              <sphereGeometry args={[0.18, 16, 16]} />
              <meshStandardMaterial color={palette.sub} roughness={0.4} />
            </mesh>
          </>
        )}

        {animal === "사슴" && (
          <>
            {/* 귀 */}
            <mesh castShadow position={[-0.5, 0.34, 0]} rotation={[0, 0, 0.8]}>
              <capsuleGeometry args={[0.08, 0.18, 10, 14]} />
              <meshStandardMaterial color={palette.main} roughness={0.35} />
            </mesh>
            <mesh castShadow position={[0.5, 0.34, 0]} rotation={[0, 0, -0.8]}>
              <capsuleGeometry args={[0.08, 0.18, 10, 14]} />
              <meshStandardMaterial color={palette.main} roughness={0.35} />
            </mesh>
            {/* 가지 모양 뿔 */}
            <group position={[-0.24, 0.62, 0]} rotation={[0, 0, 0.2]}>
              <mesh castShadow position={[0, 0.14, 0]}>
                <cylinderGeometry args={[0.035, 0.045, 0.34, 12]} />
                <meshStandardMaterial color={palette.accent} roughness={0.45} />
              </mesh>
              <mesh castShadow position={[-0.08, 0.18, 0]} rotation={[0, 0, 0.7]}>
                <cylinderGeometry args={[0.025, 0.03, 0.16, 10]} />
                <meshStandardMaterial color={palette.accent} roughness={0.45} />
              </mesh>
            </group>
            <group position={[0.24, 0.62, 0]} rotation={[0, 0, -0.2]}>
              <mesh castShadow position={[0, 0.14, 0]}>
                <cylinderGeometry args={[0.035, 0.045, 0.34, 12]} />
                <meshStandardMaterial color={palette.accent} roughness={0.45} />
              </mesh>
              <mesh castShadow position={[0.08, 0.18, 0]} rotation={[0, 0, -0.7]}>
                <cylinderGeometry args={[0.025, 0.03, 0.16, 10]} />
                <meshStandardMaterial color={palette.accent} roughness={0.45} />
              </mesh>
            </group>
          </>
        )}

        {animal === "고슴도치" && (
          <>
            <mesh castShadow position={[-0.45, 0.36, 0.04]}>
              <sphereGeometry args={[0.11, 14, 14]} />
              <meshStandardMaterial color={palette.main} roughness={0.4} />
            </mesh>
            <mesh castShadow position={[0.45, 0.36, 0.04]}>
              <sphereGeometry args={[0.11, 14, 14]} />
              <meshStandardMaterial color={palette.main} roughness={0.4} />
            </mesh>
            {/* 정면에서도 고슴도치임이 보이도록 머리 위와 양옆 뒤로 가시 왕관을 배치합니다 */}
            {[
              [-0.48, 0.32, -0.22, -0.2, 0.9],
              [-0.32, 0.56, -0.18, -0.25, 0.48],
              [0, 0.68, -0.16, -0.3, 0],
              [0.32, 0.56, -0.18, -0.25, -0.48],
              [0.48, 0.32, -0.22, -0.2, -0.9],
              [-0.56, 0.05, -0.25, -0.1, 1.3],
              [0.56, 0.05, -0.25, -0.1, -1.3],
            ].map(([x, y, z, rx, rz], i) => (
              <mesh key={i} castShadow position={[x, y, z]} rotation={[rx, 0, rz]}>
                <coneGeometry args={[0.12, 0.38, 10]} />
                <meshStandardMaterial color={palette.accent} roughness={0.45} />
              </mesh>
            ))}
          </>
        )}

        {/* 공통 까만 눈 2개 + 작은 하얀 반짝임 */}
        <group ref={leftEyeRef} position={[-0.22, 0.08, 0.56]}>
          <mesh>
            <sphereGeometry args={[0.068, 20, 20]} />
            <meshStandardMaterial color={darkColor} roughness={0.15} />
          </mesh>
          <mesh position={[-0.022, 0.026, 0.052]}>
            <sphereGeometry args={[0.022, 12, 12]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>

        <group ref={rightEyeRef} position={[0.22, 0.08, 0.56]}>
          <mesh>
            <sphereGeometry args={[0.068, 20, 20]} />
            <meshStandardMaterial color={darkColor} roughness={0.15} />
          </mesh>
          <mesh position={[-0.022, 0.026, 0.052]}>
            <sphereGeometry args={[0.022, 12, 12]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>

        {/* 양쪽 볼터치 (다람쥐는 더 볼록하게!) */}
        <mesh
          position={[-0.36, -0.08, 0.49]}
          scale={animal === "다람쥐" ? [1.5, 1.2, 0.9] : [1.2, 0.8, 0.5]}
        >
          <sphereGeometry args={[0.085, 16, 16]} />
          <meshStandardMaterial
            color={animal === "다람쥐" ? palette.sub : cheekColor}
            roughness={0.45}
          />
        </mesh>
        <mesh
          position={[0.36, -0.08, 0.49]}
          scale={animal === "다람쥐" ? [1.5, 1.2, 0.9] : [1.2, 0.8, 0.5]}
        >
          <sphereGeometry args={[0.085, 16, 16]} />
          <meshStandardMaterial
            color={animal === "다람쥐" ? palette.sub : cheekColor}
            roughness={0.45}
          />
        </mesh>

        {/* 입/주둥이/부리 */}
        {isBird && (
          <mesh
            position={[0, -0.05, 0.65]}
            rotation={[animal === "앵무새" ? Math.PI / 1.6 : Math.PI / 2, 0, 0]}
          >
            <coneGeometry args={[0.1, 0.22, 16]} />
            <meshStandardMaterial
              color={animal === "앵무새" ? palette.sub : palette.accent}
              roughness={0.3}
            />
          </mesh>
        )}

        {(animal === "여우" || animal === "고슴도치") && (
          <group position={[0, -0.09, 0.6]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <coneGeometry args={[0.16, 0.26, 20]} />
              <meshStandardMaterial color={palette.sub} roughness={0.4} />
            </mesh>
            <mesh position={[0, 0.01, 0.14]}>
              <sphereGeometry args={[0.055, 14, 14]} />
              <meshStandardMaterial color={darkColor} roughness={0.2} />
            </mesh>
          </group>
        )}

        {hasRoundSnout && (
          <group position={[0, -0.1, 0.55]}>
            <mesh scale={[1.15, 0.88, 0.78]}>
              <sphereGeometry args={[0.19, 16, 16]} />
              <meshStandardMaterial
                color={animal === "판다" ? "#ffffff" : palette.sub}
                roughness={0.4}
              />
            </mesh>
            <mesh position={[0, 0.055, 0.14]} scale={[1.25, 0.9, 0.85]}>
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshStandardMaterial color={darkColor} roughness={0.2} />
            </mesh>

            {/* 강아지: 내민 혀 */}
            {animal === "강아지" && (
              <mesh position={[0, -0.08, 0.14]} rotation={[0.3, 0, 0]}>
                <capsuleGeometry args={[0.045, 0.06, 8, 12]} />
                <meshStandardMaterial color={palette.accent} roughness={0.35} />
              </mesh>
            )}

            {/* 고양이: 양쪽 수염 */}
            {animal === "고양이" && (
              <>
                {[-0.04, 0, 0.04].map((y, idx) => (
                  <group key={idx}>
                    <mesh
                      position={[-0.25, y, 0.04]}
                      rotation={[0, 0, Math.PI / 2 + (idx - 1) * 0.15]}
                    >
                      <cylinderGeometry args={[0.008, 0.008, 0.26, 8]} />
                      <meshStandardMaterial color={darkColor} />
                    </mesh>
                    <mesh
                      position={[0.25, y, 0.04]}
                      rotation={[0, 0, Math.PI / 2 - (idx - 1) * 0.15]}
                    >
                      <cylinderGeometry args={[0.008, 0.008, 0.26, 8]} />
                      <meshStandardMaterial color={darkColor} />
                    </mesh>
                  </group>
                ))}
              </>
            )}
          </group>
        )}
      </group>

      {/* ==================== 2. 공통 몸통 + 동물별 몸/꼬리 특징 ==================== */}
      <group position={[0, -0.34, 0]}>
        <mesh castShadow scale={[1.06, 1.05, 0.95]}>
          <sphereGeometry args={[0.42, 20, 20]} />
          <meshStandardMaterial
            color={animal === "판다" ? "#ffffff" : palette.main}
            roughness={0.35}
            metalness={0.04}
          />
        </mesh>

        {/* 배 부분 색상 (겹침 깨짐 없이 깔끔하게 앞으로 배치) */}
        <mesh position={[0, -0.02, 0.25]} scale={[0.85, 0.92, 0.56]}>
          <sphereGeometry args={[0.27, 16, 16]} />
          <meshStandardMaterial color={palette.sub} roughness={0.4} />
        </mesh>

        {/* 거북이: 정면에서도 몸 양옆으로 뚜렷하게 보이는 큰 등딱지 */}
        {animal === "거북이" && (
          <group position={[0, 0.02, -0.16]}>
            <mesh castShadow scale={[1.82, 1.42, 1.15]}>
              <sphereGeometry args={[0.42, 16, 16]} />
              <meshStandardMaterial color={palette.accent} roughness={0.45} />
            </mesh>
            {/* 등딱지 앞쪽 테두리 링 */}
            <mesh position={[0, -0.02, 0.1]} rotation={[0.12, 0, 0]} scale={[1.85, 1.45, 0.4]}>
              <torusGeometry args={[0.37, 0.065, 10, 24]} />
              <meshStandardMaterial color="#d4b483" roughness={0.5} />
            </mesh>
          </group>
        )}

        {/* 사슴: 등과 앞쪽 어깨에 하얀 점 */}
        {animal === "사슴" && (
          <>
            <group position={[0, 0.08, -0.36]}>
              {[
                [-0.12, 0.08],
                [0.12, 0.06],
                [0, -0.06],
              ].map(([x, y], i) => (
                <mesh key={i} position={[x, y, 0]} scale={[1, 1, 0.4]}>
                  <sphereGeometry args={[0.055, 10, 10]} />
                  <meshStandardMaterial color="#ffffff" roughness={0.4} />
                </mesh>
              ))}
            </group>
            {/* 정면 어깨에도 작은 하얀 점 배치 */}
            <mesh position={[-0.28, 0.12, 0.26]} scale={[1, 1, 0.5]}>
              <sphereGeometry args={[0.048, 10, 10]} />
              <meshStandardMaterial color="#ffffff" roughness={0.4} />
            </mesh>
            <mesh position={[0.28, 0.12, 0.26]} scale={[1, 1, 0.5]}>
              <sphereGeometry args={[0.048, 10, 10]} />
              <meshStandardMaterial color="#ffffff" roughness={0.4} />
            </mesh>
          </>
        )}

        {/* 양: 몸통에 몽글몽글한 털 구 여러 개 */}
        {animal === "양" && (
          <group>
            {[
              [-0.32, 0.14, 0.16],
              [0.32, 0.14, 0.16],
              [-0.34, -0.1, -0.14],
              [0.34, -0.1, -0.14],
              [0, 0.14, -0.34],
            ].map(([x, y, z], i) => (
              <mesh key={i} castShadow position={[x, y, z]}>
                <sphereGeometry args={[0.18, 16, 16]} />
                <meshStandardMaterial color={palette.main} roughness={0.5} />
              </mesh>
            ))}
          </group>
        )}

        {/* 고슴도치: 등에 난 가시 여러 개 */}
        {animal === "고슴도치" && (
          <group position={[0, 0.1, -0.25]}>
            {[
              [-0.2, 0.25, -0.1, -0.6, 0.4],
              [0, 0.3, -0.12, -0.7, 0],
              [0.2, 0.25, -0.1, -0.6, -0.4],
              [-0.24, 0, -0.18, -1.2, 0.4],
              [0, 0.02, -0.2, -1.3, 0],
              [0.24, 0, -0.18, -1.2, -0.4],
            ].map(([x, y, z, rx, rz], i) => (
              <mesh key={i} castShadow position={[x, y, z]} rotation={[rx, 0, rz]}>
                <coneGeometry args={[0.1, 0.34, 12]} />
                <meshStandardMaterial color={palette.accent} roughness={0.45} />
              </mesh>
            ))}
          </group>
        )}

        {/* 팔 또는 날개 */}
        {isBird ? (
          <>
            <mesh
              castShadow
              position={[-0.44, 0.04, 0]}
              rotation={[0, 0, 0.45]}
              scale={[0.6, 1.25, 0.9]}
            >
              <sphereGeometry args={[0.19, 18, 18]} />
              <meshStandardMaterial
                color={animal === "앵무새" ? palette.accent : palette.main}
                roughness={0.35}
              />
            </mesh>
            <mesh
              castShadow
              position={[0.44, 0.04, 0]}
              rotation={[0, 0, -0.45]}
              scale={[0.6, 1.25, 0.9]}
            >
              <sphereGeometry args={[0.19, 18, 18]} />
              <meshStandardMaterial
                color={animal === "앵무새" ? palette.accent : palette.main}
                roughness={0.35}
              />
            </mesh>
          </>
        ) : (
          <>
            <mesh
              castShadow
              position={[-0.43, 0.06, 0.06]}
              rotation={[0.2, 0, 0.55]}
            >
              <capsuleGeometry args={[0.12, 0.16, 12, 16]} />
              <meshStandardMaterial
                color={animal === "판다" ? palette.sub : palette.main}
                roughness={0.35}
              />
            </mesh>
            <mesh
              castShadow
              position={[0.43, 0.06, 0.06]}
              rotation={[0.2, 0, -0.55]}
            >
              <capsuleGeometry args={[0.12, 0.16, 12, 16]} />
              <meshStandardMaterial
                color={animal === "판다" ? palette.sub : palette.main}
                roughness={0.35}
              />
            </mesh>
          </>
        )}

        {/* 짧은 다리 2개 */}
        <mesh castShadow position={[-0.2, -0.4, 0.08]} rotation={[0.15, 0, 0.08]}>
          <capsuleGeometry args={[0.13, 0.12, 12, 16]} />
          <meshStandardMaterial
            color={
              animal === "펭귄"
                ? palette.accent
                : animal === "판다"
                  ? palette.sub
                  : palette.main
            }
            roughness={0.35}
          />
        </mesh>
        <mesh castShadow position={[0.2, -0.4, 0.08]} rotation={[0.15, 0, -0.08]}>
          <capsuleGeometry args={[0.13, 0.12, 12, 16]} />
          <meshStandardMaterial
            color={
              animal === "펭귄"
                ? palette.accent
                : animal === "판다"
                  ? palette.sub
                  : palette.main
            }
            roughness={0.35}
          />
        </mesh>

        {/* 동물별 꼬리 */}
        <group ref={tailRef} name="character_tail" position={[0, -0.15, -0.38]}>
          {animal === "토끼" && (
            <mesh castShadow position={[0, 0, -0.06]}>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial color="#ffffff" roughness={0.5} />
            </mesh>
          )}

          {animal === "강아지" && (
            <mesh
              castShadow
              position={[0.28, 0.12, 0.02]}
              rotation={[0.4, 0.3, -0.7]}
            >
              <capsuleGeometry args={[0.075, 0.24, 10, 14]} />
              <meshStandardMaterial color={palette.main} roughness={0.35} />
            </mesh>
          )}

          {(animal === "고양이" || animal === "원숭이") && (
            <group position={[0.3, 0.14, 0.04]} rotation={[0.2, 0.2, -0.75]}>
              <mesh castShadow position={[0, 0.16, 0]}>
                <capsuleGeometry args={[0.052, 0.42, 10, 14]} />
                <meshStandardMaterial color={palette.main} roughness={0.35} />
              </mesh>
              <mesh castShadow position={[0.08, 0.4, 0.05]}>
                <sphereGeometry args={[0.065, 10, 10]} />
                <meshStandardMaterial color={palette.main} roughness={0.35} />
              </mesh>
            </group>
          )}

          {animal === "사자" && (
            <group position={[0.26, 0.1, 0]} rotation={[0.4, 0.2, -0.65]}>
              <mesh castShadow position={[0, 0.16, 0]}>
                <cylinderGeometry args={[0.03, 0.035, 0.38, 10]} />
                <meshStandardMaterial color={palette.main} roughness={0.4} />
              </mesh>
              <mesh castShadow position={[0, 0.36, 0]}>
                <sphereGeometry args={[0.1, 12, 12]} />
                <meshStandardMaterial color={palette.accent} roughness={0.45} />
              </mesh>
            </group>
          )}

          {animal === "여우" && (
            <group position={[0.38, 0.14, 0.04]} rotation={[0.25, 0.25, -0.68]}>
              <mesh castShadow>
                <capsuleGeometry args={[0.16, 0.34, 10, 14]} />
                <meshStandardMaterial color={palette.main} roughness={0.4} />
              </mesh>
              <mesh position={[0, 0.24, 0]}>
                <sphereGeometry args={[0.135, 12, 12]} />
                <meshStandardMaterial color="#ffffff" roughness={0.45} />
              </mesh>
            </group>
          )}

          {animal === "다람쥐" && (
            <group position={[0.42, 0.22, -0.02]} rotation={[0.15, 0.2, -0.35]}>
              <mesh castShadow position={[0, 0, 0]} scale={[0.9, 1.15, 0.9]}>
                <sphereGeometry args={[0.23, 14, 14]} />
                <meshStandardMaterial color={palette.accent} roughness={0.45} />
              </mesh>
              <mesh castShadow position={[0.08, 0.28, 0.04]} scale={[0.95, 1.1, 0.95]}>
                <sphereGeometry args={[0.25, 14, 14]} />
                <meshStandardMaterial color={palette.main} roughness={0.45} />
              </mesh>
            </group>
          )}
        </group>
      </group>
    </group>
  );
}
