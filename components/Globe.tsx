"use client";
import React, { Suspense, useMemo, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line as DreiLine } from "@react-three/drei";
import * as THREE from "three";

function latLongToVector3(lat: number, lon: number, radius = 2) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function ContinentOutlines() {
  const [paths, setPaths] = useState<THREE.Vector3[][]>([]);

  useEffect(() => {
    // Fetch medium-resolution geojson for clear, defined outlines
    fetch('https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json')
      .then(res => res.json())
      .then(data => {
        const newPaths: THREE.Vector3[][] = [];
        const radius = 2.005; // Just slightly above the sphere to prevent z-fighting

        data.features.forEach((feature: any) => {
          if (feature.geometry.type === 'Polygon') {
            feature.geometry.coordinates.forEach((polygon: any) => {
              const points = polygon.map((coord: [number, number]) => latLongToVector3(coord[1], coord[0], radius));
              newPaths.push(points);
            });
          } else if (feature.geometry.type === 'MultiPolygon') {
            feature.geometry.coordinates.forEach((multiPolygon: any) => {
              multiPolygon.forEach((polygon: any) => {
                const points = polygon.map((coord: [number, number]) => latLongToVector3(coord[1], coord[0], radius));
                newPaths.push(points);
              });
            });
          }
        });
        setPaths(newPaths);
      })
      .catch(err => console.error("Error loading geojson", err));
  }, []);

  return (
    <group>
      {paths.map((points, i) => (
        <DreiLine
          key={i}
          points={points}
          color="#FF6A00"
          lineWidth={0.8}
          transparent
          opacity={0.8}
        />
      ))}
    </group>
  );
}

function OrbitalRings() {
  const rings = useMemo(() => {
    const r = [];
    const radius = 2.4;
    for (let j = 0; j < 2; j++) {
      const pts = [];
      for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        pts.push(new THREE.Vector3(Math.cos(angle) * radius, (j - 0.5) * 0.5, Math.sin(angle) * radius));
      }
      r.push(pts);
    }
    return r;
  }, []);

  return (
    <group>
      {rings.map((pts, i) => (
        <DreiLine key={i} points={pts} color="#FF6A00" lineWidth={1} transparent opacity={0.4} />
      ))}
    </group>
  );
}

export default function Globe({ origins = [], destination = "USA" }: { origins?: string[]; destination?: string }) {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5.5], fov: 45 }}>
        <ambientLight intensity={2.5} color="#ffffff" />
        <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
        <directionalLight position={[-5, -5, 5]} intensity={0.5} color="#ffffff" />
        <Suspense fallback={null}>
          <group rotation={[0, -Math.PI / 2, 0]}>
            {/* White Sphere Base with slight shading for 3D effect */}
            <mesh>
              <sphereGeometry args={[2, 64, 64]} />
              <meshStandardMaterial color="#FFFFFF" roughness={1} metalness={0} />
            </mesh>
            <ContinentOutlines />
            <OrbitalRings />
          </group>
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}


