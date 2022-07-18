// import {Button} from '../Button'
// import {Container} from './styles'
import {useRef, useEffect} from "react";
import * as THREE from 'three';

// const KinectAzure = require('kinect-azure');
// const kinect = new KinectAzure();

export function Volumetric() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current !== null) {
            const renderer = new THREE.WebGLRenderer({
                canvas: canvasRef.current
            });
            renderer.setPixelRatio(window.devicePixelRatio);

            const scene = new THREE.Scene();

            const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
            camera.position.set(0, 0, 2000);
            camera.lookAt(0, 0, 0);
            // const controls = new THREE.OrbitControls(camera, renderer.domElement);


            const DEPTH_WIDTH = 640;
            const DEPTH_HEIGHT = 576;
            const numPoints = DEPTH_WIDTH * DEPTH_HEIGHT;
            const vertices = [];
            const colors = [];
            for (let i = 0; i < numPoints; i++) {
                const x = (i % DEPTH_WIDTH) - DEPTH_WIDTH * 0.5;
                const y = DEPTH_HEIGHT / 2 - Math.floor(i / DEPTH_WIDTH);
                const z = 0;
                // const particle = new THREE.Vector3(x, y, 0);
                vertices.push(x, y, z);
                const color = new THREE.Color(0x000000);
                colors.push(color);
            }

            const geom = new THREE.BufferGeometry();
            const material = new THREE.PointsMaterial({});

            // @ts-ignore
            geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));


            const cloud = new THREE.Points(geom, material);
            scene.add(cloud);

            // const depthModeRange = kinect.getDepthModeRange(KinectAzure.K4A_DEPTH_MODE_NFOV_UNBINNED);

            // if (kinect.open()) {
            //   kinect.startCameras({
            //     depth_mode: KinectAzure.K4A_DEPTH_MODE_NFOV_UNBINNED,
            //     color_format: KinectAzure.K4A_IMAGE_FORMAT_COLOR_BGRA32,
            //     color_resolution: KinectAzure.K4A_COLOR_RESOLUTION_720P,
            //     include_color_to_depth: true
            //   });
            //   kinect.startListening((data: { depthImageFrame: { imageData: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>; }; colorToDepthImageFrame: { imageData: WithImplicitCoercion<ArrayBuffer | SharedArrayBuffer>; }; }) => {
            //     const newDepthData = Buffer.from(data.depthImageFrame.imageData);
            //     const newColorData = Buffer.from(data.colorToDepthImageFrame.imageData);
            //     let pointIndex = 0;
            //     console.log(newColorData);
            //     for (let i = 0; i < newDepthData.length; i += 2) {
            //       const depthValue = newDepthData[i + 1] << 8 | newDepthData[i];
            //       const b = newColorData[pointIndex * 4 + 0];
            //       const g = newColorData[pointIndex * 4 + 1];
            //       const r = newColorData[pointIndex * 4 + 2];
            //       if (depthValue > depthModeRange.min && depthValue < depthModeRange.max) {
            //         geom.vertices[pointIndex].z = depthValue;
            //       } else {
            //         geom.vertices[pointIndex].z = Number.MAX_VALUE;
            //       }
            //       geom.colors[pointIndex].setRGB(r / 255, g / 255, b / 255);
            //       pointIndex++;
            //     }
            //     geom.verticesNeedUpdate = true;
            //     geom.colorsNeedUpdate = true;
            //   });
            // }

            const animate = () => {
                requestAnimationFrame(animate);
                renderer.render(scene, camera);
            };

            animate();
        }

    }, [canvasRef]);


    // function handleSayHello() {
    //     window.Main.sendMessage('Hello World');
    //     // const canvasElement = canvasRef.current;
    //     // if(canvasElement !== null){
    //     //     const canvasCtx = canvasElement?.getContext('2d');
    //     // }
    //
    //     console.log('Message sent! Check main process log in terminal.')
    // }

    return (
        <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight}/>

        // <Container>
        //         {/* <Image */}
        //         {/*     src="https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg" */}
        //         {/*     alt="ReactJS logo" */}
        //         {/* /> */}
        //         {/* <Text>An Electron boilerplate including TypeScript, React, Jest and ESLint.</Text> */}
        //         <Button onClick={handleSayHello}>Send message to main process</Button>
        //     </Container>
    )
}

