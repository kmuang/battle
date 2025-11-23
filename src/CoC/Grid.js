import * as THREE from 'three'

export default class Grid {
    constructor(scene) {
        this.scene = scene
        this.size = 44 // Standard CoC base size
        this.tileSize = 1

        this.createGrass()
        this.createBorder()
    }

    createGrass() {
        const geometry = new THREE.PlaneGeometry(this.size, this.size, this.size, this.size)
        geometry.rotateX(-Math.PI * 0.5)

        // Checkerboard texture or vertex colors
        const count = geometry.attributes.position.count
        const colors = new Float32Array(count * 3)

        const lightGreen = new THREE.Color('#86c336') // Light grass
        const darkGreen = new THREE.Color('#7eb530')  // Dark grass

        // We need to color faces (quads), but PlaneGeometry uses vertices.
        // To get a sharp checkerboard, we might need a custom shader or a texture.
        // For simplicity in this "low poly" style, let's use a texture canvas.

        const canvas = document.createElement('canvas')
        canvas.width = 64
        canvas.height = 64
        const context = canvas.getContext('2d')

        context.fillStyle = '#86c336'
        context.fillRect(0, 0, 64, 64)

        context.fillStyle = '#7eb530'
        for (let y = 0; y < 64; y += 2) {
            for (let x = 0; x < 64; x += 2) {
                if ((x / 2 + y / 2) % 2 === 0) {
                    // Checker pattern
                }
            }
        }
        // Actually, simpler: just draw 2x2 pixels for the pattern
        // Let's just use a simple color for now and add a grid helper

        const material = new THREE.MeshStandardMaterial({
            color: '#86c336',
            roughness: 1,
            metalness: 0
        })

        this.mesh = new THREE.Mesh(geometry, material)
        this.mesh.receiveShadow = true
        this.scene.add(this.mesh)

        // Grid Helper
        const gridHelper = new THREE.GridHelper(this.size, this.size, 0x000000, 0x000000)
        gridHelper.position.y = 0.01
        gridHelper.material.opacity = 0.1
        gridHelper.material.transparent = true
        this.scene.add(gridHelper)
    }

    createBorder() {
        // Darker grass border
        const geometry = new THREE.PlaneGeometry(this.size + 10, this.size + 10)
        geometry.rotateX(-Math.PI * 0.5)
        const material = new THREE.MeshStandardMaterial({ color: '#5d8a23' })

        const border = new THREE.Mesh(geometry, material)
        border.position.y = -0.1
        border.receiveShadow = true
        this.scene.add(border)
    }
}
