"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = {
	active: number;
	expanded: boolean;
	onReady: () => void;
	onError: () => void;
};

export default function SystemScene({
	active,
	expanded,
	onReady,
	onError,
}: Props) {
	const host = useRef<HTMLDivElement>(null);
	const update = useRef<(() => void) | null>(null);
	const state = useRef({ active, expanded });
	state.current = { active, expanded };
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
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
		renderer.setClearColor(0x0b1016, 0);
		element.appendChild(renderer.domElement);
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
		camera.position.set(5.1, 4.6, 6.6);
		camera.lookAt(0, 1.75, 0);
		scene.add(new THREE.HemisphereLight(0xe5f7ff, 0x263140, 2));
		const light = new THREE.DirectionalLight(0xffffff, 3);
		light.position.set(-3, 7, 5);
		scene.add(light);
		const system = new THREE.Group();
		scene.add(system);
		const geometries: THREE.BufferGeometry[] = [];
		const materials: THREE.Material[] = [];
		const outlines: THREE.LineBasicMaterial[][] = [[], [], []];
		function box(
			parent: THREE.Group,
			size: number[],
			position: number[],
			layer: number,
			color = 0x14202b,
		) {
			const geometry = new THREE.BoxGeometry(size[0], size[1], size[2]);
			geometries.push(geometry);
			const material = new THREE.MeshStandardMaterial({
				color,
				roughness: 0.6,
				metalness: 0.35,
			});
			materials.push(material);
			const mesh = new THREE.Mesh(geometry, material);
			mesh.position.set(position[0], position[1], position[2]);
			parent.add(mesh);
			const edges = new THREE.EdgesGeometry(geometry);
			geometries.push(edges);
			const ink = new THREE.LineBasicMaterial({
				color: 0x65808f,
				transparent: true,
				opacity: 0.85,
			});
			materials.push(ink);
			outlines[layer].push(ink);
			const outline = new THREE.LineSegments(edges, ink);
			mesh.add(outline);
			return mesh;
		}
		const layers = [0, 1, 2].map((index) => {
			const layer = new THREE.Group();
			system.add(layer);
			layer.position.y = index * 1.1;
			box(layer, [3.7, 0.14, 2.25], [0, 0, 0], index, 0x0f1923);
			if (index === 0) {
				for (let server = 0; server < 3; server++) {
					box(
						layer,
						[0.82, 0.22, 0.65],
						[-0.9, 0.2 + server * 0.26, 0.1],
						index,
					);
					box(
						layer,
						[0.07, 0.03, 0.02],
						[-1.12, 0.2 + server * 0.26, 0.435],
						index,
						0xe7a77d,
					);
				}
				const geometry = new THREE.CylinderGeometry(0.38, 0.38, 0.65, 32);
				geometries.push(geometry);
				const material = new THREE.MeshStandardMaterial({
					color: 0x17323f,
					metalness: 0.45,
					roughness: 0.5,
				});
				materials.push(material);
				const database = new THREE.Mesh(geometry, material);
				database.position.set(0.95, 0.4, 0.2);
				layer.add(database);
				for (const y of [0.09, 0.31, 0.53, 0.75]) {
					const ringGeometry = new THREE.TorusGeometry(0.38, 0.008, 4, 32);
					geometries.push(ringGeometry);
					const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x8bd3df });
					materials.push(ringMaterial);
					const ring = new THREE.Mesh(ringGeometry, ringMaterial);
					ring.rotation.x = Math.PI / 2;
					ring.position.set(0.95, y, 0.2);
					layer.add(ring);
				}
			} else if (index === 1) {
				box(layer, [2.8, 0.03, 1.55], [0, 0.07, 0], index, 0x192936);
				box(layer, [0.45, 0.03, 1.25], [-1.07, 0.1, 0], index, 0x0b141b);
				for (let row = 0; row < 4; row++)
					box(
						layer,
						[1.5 - row * 0.16, 0.015, 0.06],
						[0.18, 0.115, -0.45 + row * 0.22],
						index,
						row === 0 ? 0x8bd3df : 0x49606c,
					);
			} else {
				box(layer, [1.02, 1.9, 0.12], [0, 1.03, 0], index, 0x08121b);
				box(layer, [0.87, 1.66, 0.015], [0, 1.03, 0.07], index, 0x162531);
				box(layer, [0.26, 0.025, 0.03], [0, 1.78, 0.087], index, 0x8bd3df);
				for (let row = 0; row < 3; row++) {
					box(
						layer,
						[0.64, 0.2, 0.015],
						[0, 1.4 - row * 0.32, 0.085],
						index,
						0x243b49,
					);
					box(
						layer,
						[0.38, 0.024, 0.015],
						[0.08, 1.4 - row * 0.32, 0.1],
						index,
						0x71939d,
					);
				}
				box(layer, [0.6, 0.12, 0.015], [0, 0.4, 0.085], index, 0xe7a77d);
			}
			return layer;
		});
		const connectionGeometry = new THREE.BufferGeometry();
		const connectionPositions = new Float32Array(24);
		connectionGeometry.setAttribute(
			"position",
			new THREE.BufferAttribute(connectionPositions, 3),
		);
		geometries.push(connectionGeometry);
		const connectionMaterial = new THREE.LineBasicMaterial({
			color: 0x547e89,
			transparent: true,
			opacity: 0.7,
		});
		materials.push(connectionMaterial);
		const connections = new THREE.LineSegments(
			connectionGeometry,
			connectionMaterial,
		);
		system.add(connections);
		let frame = 0;
		let visible = true;
		let disposed = false;
		let pointerX = 0;
		let pointerY = 0;
		function render() {
			frame = 0;
			if (!visible || disposed) return;
			let moving = false;
			layers.forEach((layer, index) => {
				const target = index * (state.current.expanded ? 1.1 : 0.16);
				const delta = target - layer.position.y;
				layer.position.y += delta * 0.13;
				if (Math.abs(delta) > 0.002) moving = true;
				outlines[index].forEach((material) =>
					material.color.setHex(
						state.current.active === index ? 0x8bd3df : 0x6d8a98,
					),
				);
			});
			const points: number[] = [];
			for (const [x, z] of [
				[-1.3, -0.7],
				[1.3, -0.7],
				[-1.3, 0.7],
				[1.3, 0.7],
			])
				points.push(x, 0.06, z, x, layers[2].position.y, z);
			connectionPositions.set(points);
			connectionGeometry.attributes.position.needsUpdate = true;
			const rotationDelta = pointerX - system.rotation.y;
			const tiltDelta = pointerY - system.rotation.x;
			system.rotation.y += rotationDelta * 0.08;
			system.rotation.x += tiltDelta * 0.08;
			if (Math.abs(rotationDelta) + Math.abs(tiltDelta) > 0.001) moving = true;
			renderer.render(scene, camera);
			if (moving) frame = requestAnimationFrame(render);
		}
		function schedule() {
			if (!frame && visible && !disposed) frame = requestAnimationFrame(render);
		}
		update.current = schedule;
		const resize = new ResizeObserver(() => {
			const { width, height } = element.getBoundingClientRect();
			if (!width || !height) return;
			renderer.setSize(width, height);
			camera.aspect = width / height;
			camera.updateProjectionMatrix();
			schedule();
		});
		resize.observe(element);
		const observer = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting && !document.hidden;
			if (visible) schedule();
			else if (frame) {
				cancelAnimationFrame(frame);
				frame = 0;
			}
		});
		observer.observe(element);
		function pointer(event: PointerEvent) {
			const bounds = element.getBoundingClientRect();
			pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.2;
			pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 0.06;
			schedule();
		}
		function leave() {
			pointerX = 0;
			pointerY = 0;
			schedule();
		}
		function visibility() {
			visible =
				!document.hidden &&
				element.getBoundingClientRect().bottom > 0 &&
				element.getBoundingClientRect().top < window.innerHeight;
			if (visible) schedule();
			else {
				cancelAnimationFrame(frame);
				frame = 0;
			}
		}
		function lost(event: Event) {
			event.preventDefault();
			onError();
		}
		element.addEventListener("pointermove", pointer);
		element.addEventListener("pointerleave", leave);
		document.addEventListener("visibilitychange", visibility);
		renderer.domElement.addEventListener("webglcontextlost", lost);
		schedule();
		onReady();
		return () => {
			disposed = true;
			cancelAnimationFrame(frame);
			update.current = null;
			resize.disconnect();
			observer.disconnect();
			element.removeEventListener("pointermove", pointer);
			element.removeEventListener("pointerleave", leave);
			document.removeEventListener("visibilitychange", visibility);
			renderer.domElement.removeEventListener("webglcontextlost", lost);
			geometries.forEach((geometry) => geometry.dispose());
			materials.forEach((material) => material.dispose());
			renderer.dispose();
			renderer.domElement.remove();
		};
	}, [onReady, onError]);
	useEffect(() => {
		update.current?.();
	}, [active, expanded]);
	return <div ref={host} className="system-canvas" aria-hidden="true" />;
}
