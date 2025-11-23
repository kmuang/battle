import * as THREE from 'three'

export default class Environment {
    constructor(scene) {
        this.scene = scene
        this.createBorderTrees()
        this.createRocks()
    }

    createBorderTrees() {
        const trunkGeo = new THREE.CylinderGeometry(0.5, 0.8, 2)
        const leavesGeo = new THREE.ConeGeometry(2, 4, 8)
        leavesGeo.translate(0, 3, 0)

        const trunkMat = new THREE.MeshStandardMaterial({ color: '#8B4513' })
        const leavesMat = new THREE.MeshStandardMaterial({ color: '#228B22' })

        // Merge for performance? Or just simple loop for now.
        // Loop is fine for < 100 trees.

        const range = 25
        const count = 40

        for (let i = 0; i < count; i++) {
            const group = new THREE.Group()

            const trunk = new THREE.Mesh(trunkGeo, trunkMat)
            trunk.position.y = 1
            group.add(trunk)

            const leaves = new THREE.Mesh(leavesGeo, leavesMat)
            group.add(leaves)

            // Place around the border (outside -22 to 22)
            let x, z
            if (Math.random() < 0.5) {
                x = (Math.random() < 0.5 ? -1 : 1) * (22 + Math.random() * 5)
                z = (Math.random() - 0.5) * 60
            } else {
                z = (Math.random() < 0.5 ? -1 : 1) * (22 + Math.random() * 5)
                x = (Math.random() - 0.5) * 60
            }

            group.position.set(x, 0, z)

            // Random scale
            const scale = 0.8 + Math.random() * 0.5
            group.scale.set(scale, scale, scale)

            this.scene.add(group)
        }
    }

    createRocks() {
        const geo = new THREE.DodecahedronGeometry(1)
        const mat = new THREE.MeshStandardMaterial({ color: '#808080' })

        for (let i = 0; i < 10; i++) {
            const rock = new THREE.Mesh(geo, mat)

            let x, z
            if (Math.random() < 0.5) {
                x = (Math.random() < 0.5 ? -1 : 1) * (22 + Math.random() * 5)
                z = (Math.random() - 0.5) * 60
            } else {
                z = (Math.random() < 0.5 ? -1 : 1) * (22 + Math.random() * 5)
                x = (Math.random() - 0.5) * 60
            }

            rock.position.set(x, 0.5, z)
            rock.scale.set(1 + Math.random(), 1 + Math.random(), 1 + Math.random())

            this.scene.add(rock)
        }
    }
}
