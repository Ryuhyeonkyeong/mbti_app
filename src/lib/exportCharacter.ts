import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter.js";
import type { MbtiTypeCode } from "@/data/types";

// 3D 캐릭터 그룹에 유형별 애니메이션 클립을 생성해 붙입니다
function createIdleAnimationClip(typeCode: MbtiTypeCode): THREE.AnimationClip {
  const duration = 2.4;
  const times = [0, 0.6, 1.2, 1.8, 2.4];

  // 위아래로 움직이는 높이 값 (유형별 성격에 맞춰 다르게 설정)
  let yValues: number[];
  if (typeCode === "ENFP" || typeCode === "ESTP") {
    // 신나게 통통 튀는 움직임
    yValues = [0, 0.14, 0, 0.14, 0];
  } else if (typeCode === "INFP" || typeCode === "ENFJ" || typeCode === "ESFP") {
    // 가볍게 톡톡 뛰는 움직임
    yValues = [0, 0.08, 0, 0.08, 0];
  } else {
    // 부드럽게 둥실거리는 움직임
    yValues = [0, 0.05, 0, -0.04, 0];
  }

  const posValues = yValues.flatMap((y) => [0, y, 0]);
  const posTrack = new THREE.VectorKeyframeTrack(
    "character_root.position",
    times,
    posValues
  );

  // 숨 쉬듯 살짝 커졌다 작아지는 크기 애니메이션
  const scaleValues = [
    1, 1, 1,
    1.025, 1.025, 1.025,
    1, 1, 1,
    1.025, 1.025, 1.025,
    1, 1, 1,
  ];
  const scaleTrack = new THREE.VectorKeyframeTrack(
    "character_root.scale",
    times,
    scaleValues
  );

  // 머리 움직임 (고개 끄덕임 / 갸웃거림 / 좌우 살피기)
  const makeQuat = (x: number, y: number, z: number) => {
    const q = new THREE.Quaternion().setFromEuler(new THREE.Euler(x, y, z));
    return [q.x, q.y, q.z, q.w];
  };

  let headQuats: number[];
  if (typeCode === "ISTJ" || typeCode === "ENTJ" || typeCode === "ISTP") {
    headQuats = [
      ...makeQuat(0, 0, 0),
      ...makeQuat(0.09, 0, 0),
      ...makeQuat(0, 0, 0),
      ...makeQuat(-0.05, 0, 0),
      ...makeQuat(0, 0, 0),
    ];
  } else if (typeCode === "INTJ") {
    headQuats = [
      ...makeQuat(0, 0, 0),
      ...makeQuat(0, 0.16, 0),
      ...makeQuat(0, 0, 0),
      ...makeQuat(0, -0.16, 0),
      ...makeQuat(0, 0, 0),
    ];
  } else {
    headQuats = [
      ...makeQuat(0, 0, 0),
      ...makeQuat(0, 0, 0.08),
      ...makeQuat(0, 0, 0),
      ...makeQuat(0, 0, -0.08),
      ...makeQuat(0, 0, 0),
    ];
  }

  const headTrack = new THREE.QuaternionKeyframeTrack(
    "character_head.quaternion",
    times,
    headQuats
  );

  // 꼬리 흔들기 애니메이션
  const tailQuats = [
    ...makeQuat(0, 0, 0),
    ...makeQuat(0, 0.28, 0),
    ...makeQuat(0, 0, 0),
    ...makeQuat(0, -0.28, 0),
    ...makeQuat(0, 0, 0),
  ];
  const tailTrack = new THREE.QuaternionKeyframeTrack(
    "character_tail.quaternion",
    times,
    tailQuats
  );

  return new THREE.AnimationClip("idle", duration, [
    posTrack,
    scaleTrack,
    headTrack,
    tailTrack,
  ]);
}

// 현재 3D 캐릭터를 애니메이션이 포함된 GLB 파일로 내려받습니다
export function exportAnimatedCharacterGlb(
  rootObject: THREE.Object3D,
  typeCode: MbtiTypeCode
): Promise<void> {
  return new Promise((resolve, reject) => {
    const exporter = new GLTFExporter();
    const clip = createIdleAnimationClip(typeCode);

    exporter.parse(
      rootObject,
      (result) => {
        if (!(result instanceof ArrayBuffer)) {
          reject(new Error("GLB 바이너리 생성에 실패했습니다."));
          return;
        }

        const blob = new Blob([result], { type: "model/gltf-binary" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `tina-mbti-${typeCode}.glb`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        resolve();
      },
      (error) => {
        reject(error);
      },
      {
        binary: true,
        animations: [clip],
      }
    );
  });
}
