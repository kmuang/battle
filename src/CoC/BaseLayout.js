import * as THREE from 'three'
import Buildings from './Buildings.js'

export default class BaseLayout {
    constructor(scene) {
        this.scene = scene
        this.buildings = new Buildings()
        this.buildingsList = [] // Store for targeting

        this.createLayout()
    }

    createLayout() {
        // Town Hall (Center)
        this.placeBuilding(this.buildings.createTownHall(), 0, 0, 'townhall')

        // Walls (Inner Layer)
        this.createWallRect(-4, -4, 4, 4)

        // Defenses
        this.placeBuilding(this.buildings.createCannon(), -6, 0, 'cannon')
        this.placeBuilding(this.buildings.createCannon(), 6, 0, 'cannon')
        this.placeBuilding(this.buildings.createArcherTower(), 0, -6, 'archertower')
        this.placeBuilding(this.buildings.createArcherTower(), 0, 6, 'archertower')
        this.placeBuilding(this.buildings.createRocketDefense(), 0, 3, 'rocket') // New Rocket Defense

        // Resources
        this.placeBuilding(this.buildings.createGoldStorage(), -6, -6, 'storage')
        this.placeBuilding(this.buildings.createGoldStorage(), 6, 6, 'storage')
        this.placeBuilding(this.buildings.createElixirCollector(), 6, -6, 'storage')
        this.placeBuilding(this.buildings.createElixirCollector(), -6, 6, 'storage')

        // Heroes
        this.placeBuilding(this.buildings.createHeroAltar('#4169E1'), -3, 3, 'altar') // King (Blue)
        this.placeBuilding(this.buildings.createHeroAltar('#800080'), 3, -3, 'altar') // Queen (Purple)

        // Outer Walls
        this.createWallRect(-9, -9, 9, 9)
    }

    placeBuilding(mesh, x, z, type = 'building') {
        mesh.position.set(x, 0, z)
        mesh.userData.type = type
        this.scene.add(mesh)
        this.buildingsList.push(mesh)
    }

    createWallRect(x1, z1, x2, z2) {
        // Top & Bottom
        for (let x = x1; x <= x2; x++) {
            this.placeBuilding(this.buildings.createWall(), x, z1, 'wall')
            this.placeBuilding(this.buildings.createWall(), x, z2, 'wall')
        }
        // Left & Right
        for (let z = z1 + 1; z < z2; z++) {
            this.placeBuilding(this.buildings.createWall(), x1, z, 'wall')
            this.placeBuilding(this.buildings.createWall(), x2, z, 'wall')
        }
    }

    update(troops, projectiles, audio) {
        // Update defenses
        this.buildingsList.forEach(building => {
            if (building.userData.type === 'cannon' || building.userData.type === 'archertower' || building.userData.type === 'rocket') {
                // Find nearest troop
                let nearest = null
                let minDist = 10 // Range

                troops.forEach(troop => {
                    const dist = building.position.distanceTo(troop.mesh.position)
                    if (dist < minDist) {
                        minDist = dist
                        nearest = troop
                    }
                })

                if (nearest) {
                    // Rotate to face target
                    building.lookAt(nearest.mesh.position)

                    // Fire (simple rate limit via random)
                    if (Math.random() < 0.02) {
                        if (building.userData.type === 'cannon') {
                            projectiles.fireCannonball(building.position.clone().add(new THREE.Vector3(0, 1, 0)), nearest.mesh.position)
                            audio.playCannon()
                        } else if (building.userData.type === 'archertower') {
                            projectiles.fireArrow(building.position.clone().add(new THREE.Vector3(0, 3, 0)), nearest.mesh.position)
                            audio.playArrow()
                        } else if (building.userData.type === 'rocket') {
                            projectiles.fireRocket(building.position.clone().add(new THREE.Vector3(0, 2, 0)), nearest.mesh.position)
                            audio.playRocket()
                        }
                    }
                }
            }
        })
    }
}
