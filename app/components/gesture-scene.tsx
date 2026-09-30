"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { handConnections, handPose } from "@/util/hand-landmarks";

export default function GestureScene({
	pose,
	onReady,
	onError,
}: {
	pose: number;
	onReady: () => void;
	onError: () => void;
}) {
	const host = useRef<HTMLDivElement>(null);
	const currentPose = useRef(pose);
	const update = useRef<(() => void) | null>(null);
	currentPose.current = pose;
	useEffect(() => {
		if (!host.current) return;
		const element = host.current;
		let renderer: THREE.WebGLRenderer;
		try {
			renderer = new THREE.WebGLRenderer({
				alpha: true,
				antialias: true,
				powerPreference: "low-power",
			});
		} catch {
			onError();
			return;
		}
		renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
		element.appendChild(renderer.domElement);
		const scene = new THREE.Scene();
		const camera = new THREE.OrthographicCamera(-3, 3, 2.8, -2.8, 0.1, 30);
		camera.position.set(0, 0.4, 8);
		camera.lookAt(0, 0.4, 0);
		const hand = new THREE.Group();
		hand.rotation.y = -0.22;
		scene.add(hand);
		const jointGeometry = new THREE.SphereGeometry(0.045, 12, 8);
		const cyan = new THREE.MeshBasicMaterial({ color: 0x8bd3df });
		const copper = new THREE.MeshBasicMaterial({ color: 0xe7a77d });
		const joints = handPose(currentPose.current).map((point, index) => {
			const joint = new THREE.Mesh(
				jointGeometry,
				index > 0 && index % 4 === 0 ? copper : cyan,
			);
			joint.position.set(...point);
			hand.add(joint);
			return joint;
		});
		const wireGeometry = new THREE.BufferGeometry();
		const wirePositions = new Float32Array(handConnections.length * 6);
		wireGeometry.setAttribute(
			"position",
			new THREE.BufferAttribute(wirePositions, 3),
		);
		const wireMaterial = new THREE.LineBasicMaterial({
			color: 0x8bd3df,
			transparent: true,
			opacity: 0.78,
		});
		hand.add(new THREE.LineSegments(wireGeometry, wireMaterial));
		const palmGeometry = new THREE.BufferGeometry();
		const palmPositions = new Float32Array(27);
		palmGeometry.setAttribute(
			"position",
			new THREE.BufferAttribute(palmPositions, 3),
		);
		const palmMaterial = new THREE.MeshBasicMaterial({
			color: 0x8bd3df,
			transparent: true,
			opacity: 0.08,
			side: THREE.DoubleSide,
			depthWrite: false,
		});
		hand.add(new THREE.Mesh(palmGeometry, palmMaterial));
		let frame = 0;
		let visible = false;
		let disposed = false;
		let rotationX = 0;
		let rotationY = -0.22;
		function render() {
			frame = 0;
			if (!visible || document.hidden || disposed) return;
			let moving = false;
			const target = handPose(currentPose.current);
			joints.forEach((joint, i) => {
				const next = new THREE.Vector3(...target[i]);
				if (joint.position.distanceToSquared(next) > 0.000002) moving = true;
				joint.position.lerp(next, 0.14);
			});
			handConnections.forEach(([a, b], i) => {
				joints[a].position.toArray(wirePositions, i * 6);
				joints[b].position.toArray(wirePositions, i * 6 + 3);
			});
			wireGeometry.attributes.position.needsUpdate = true;
			[0, 5, 9, 0, 9, 13, 0, 13, 17].forEach((index, i) =>
				joints[index].position.toArray(palmPositions, i * 3),
			);
			palmGeometry.attributes.position.needsUpdate = true;
			if (
				Math.abs(rotationY - hand.rotation.y) +
					Math.abs(rotationX - hand.rotation.x) >
				0.001
			)
				moving = true;
			hand.rotation.y += (rotationY - hand.rotation.y) * 0.1;
			hand.rotation.x += (rotationX - hand.rotation.x) * 0.1;
			renderer.render(scene, camera);
			if (moving) frame = requestAnimationFrame(render);
		}
		function schedule() {
			if (!frame && visible && !disposed && !document.hidden)
				frame = requestAnimationFrame(render);
		}
		update.current = schedule;
		const resize = new ResizeObserver(() => {
			const { width, height } = element.getBoundingClientRect();
			if (!width || !height) return;
			renderer.setSize(width, height);
			const aspect = width / height;
			const size = Math.max(2.25, 1.85 / aspect);
			camera.left = -size * aspect;
			camera.right = size * aspect;
			camera.top = size;
			camera.bottom = -size;
			camera.updateProjectionMatrix();
			schedule();
		});
		resize.observe(element);
		const observer = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			if (visible) schedule();
			else {
				cancelAnimationFrame(frame);
				frame = 0;
			}
		});
		observer.observe(element);
		function pointer(event: PointerEvent) {
			if (event.pointerType !== "mouse") return;
			const rect = element.getBoundingClientRect();
			rotationY = ((event.clientX - rect.left) / rect.width - 0.5) * 0.9;
			rotationX = ((event.clientY - rect.top) / rect.height - 0.5) * 0.3;
			schedule();
		}
		function leave() {
			rotationX = 0;
			rotationY = -0.22;
			schedule();
		}
		function visibility() {
			if (document.hidden) {
				cancelAnimationFrame(frame);
				frame = 0;
			} else schedule();
		}
		function contextLost(event: Event) {
			event.preventDefault();
			onError();
		}
		element.addEventListener("pointermove", pointer);
		element.addEventListener("pointerleave", leave);
		renderer.domElement.addEventListener("webglcontextlost", contextLost);
		document.addEventListener("visibilitychange", visibility);
		onReady();
		return () => {
			disposed = true;
			update.current = null;
			cancelAnimationFrame(frame);
			resize.disconnect();
			observer.disconnect();
			element.removeEventListener("pointermove", pointer);
			element.removeEventListener("pointerleave", leave);
			document.removeEventListener("visibilitychange", visibility);
			renderer.domElement.removeEventListener("webglcontextlost", contextLost);
			jointGeometry.dispose();
			wireGeometry.dispose();
			palmGeometry.dispose();
			cyan.dispose();
			copper.dispose();
			wireMaterial.dispose();
			palmMaterial.dispose();
			renderer.dispose();
			renderer.domElement.remove();
		};
	}, [onReady, onError]);
	useEffect(() => {
		update.current?.();
	}, [pose]);
	return <div ref={host} className="gesture-canvas" />;
}
