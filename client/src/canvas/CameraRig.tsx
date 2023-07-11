import { MutableRefObject, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useSnapshot } from 'valtio';
import { Group, Euler, Vector3 } from 'three' // Import Group and Vector3 from three package


import state from '../store';


const CameraRig = ({ children }: any) => {
  const group = useRef<Group | null>(null);
  const snap = useSnapshot(state);

  useFrame((state, delta) => {
    const isBreakpoint = window.innerWidth <= 1200;
    const isMobile = window.innerWidth <= 768;

    // set the ininital postion of model
    let targetPosition: Vector3 = new Vector3(-0.4, 0, 2)
    if (snap.intro) {
      if (isBreakpoint) targetPosition.set(0, 0, 2)
      if (isMobile) targetPosition.set(0, 0.2, 2.5)
    } else {
      if (isMobile) targetPosition.set(0, 0, 2.5)
      else targetPosition.set(0, 0, 2)
    }

    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta)

    // set the model rotation smoothly
    const rotation: Euler = new Euler();
    rotation.set(
      state.pointer.y / 10,
      -state.pointer.x / 5,
      0,
      'XYZ'
    )

    easing.dampE(
      group.current?.rotation as Euler,
      rotation,
      0.25,
      delta
    )
  })



  return <group ref={group}>{children}</group>
}

export default CameraRig