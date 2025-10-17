import { includes } from 'es-toolkit/compat';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

interface PanoramaViewerProps {
    imageSource: any;
}

export default function PanoramaViewer({ imageSource }: PanoramaViewerProps) {
    const [base64Image, setBase64Image] = useState<string | null>(null);

    async function loadImage() {
        try {
            const asset = Asset.fromModule(imageSource);
            await asset.downloadAsync();

            if (asset.localUri) {
                const base64 = await FileSystem.readAsStringAsync(asset.localUri, {
                    encoding: FileSystem.EncodingType.Base64
                });

                if (includes(asset.localUri, 'webp')) {
                    setBase64Image(`data:image/webp;base64,${base64}`);
                } else {
                    setBase64Image(`data:image/jpeg;base64,${base64}`);
                }

            }
        } catch (error) {
            Alert.alert("No image available for now");
            console.error("Error loading image: ", error);
        }
    }

    useEffect(() => {
        loadImage();
    }, []);

    if (!base64Image) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#fff" />
            </View>
        );
    }

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0">
    <title>Equirectangular Panorama</title>
    <style>
        * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        }
        body {
        background-color: #000000;
        margin: 0;
        padding: 0;
        overflow: hidden;
        position: fixed;
        width: 100%;
        height: 100%;
        touch-action: none;
        }
        #container {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        }
    </style>
    </head>
    <body>
    <div id="container"></div>

    <script>
        const THREE = {
        REVISION: '128',
        
        MathUtils: {
            degToRad: function(degrees) {
            return degrees * Math.PI / 180;
            }
        },
        
        PerspectiveCamera: function(fov, aspect, near, far) {
            this.fov = fov;
            this.aspect = aspect;
            this.near = near;
            this.far = far;
            this.position = { x: 0, y: 0, z: 0 };
            this.target = { x: 0, y: 0, z: 0 };
            this.up = { x: 0, y: 1, z: 0 };
            this.projectionMatrix = [];
            this.matrixWorldInverse = [];
            
            this.updateProjectionMatrix = function() {
            const top = this.near * Math.tan(THREE.MathUtils.degToRad(this.fov * 0.5));
            const height = 2 * top;
            const width = this.aspect * height;
            const left = -0.5 * width;
            
            const right = left + width;
            const bottom = top - height;
            
            const x = 2 * this.near / (right - left);
            const y = 2 * this.near / (top - bottom);
            const a = (right + left) / (right - left);
            const b = (top + bottom) / (top - bottom);
            const c = -(this.far + this.near) / (this.far - this.near);
            const d = -2 * this.far * this.near / (this.far - this.near);
            
            this.projectionMatrix = [
                x, 0, 0, 0,
                0, y, 0, 0,
                a, b, c, -1,
                0, 0, d, 0
            ];
            };
            
            this.lookAt = function(x, y, z) {
            this.target.x = x;
            this.target.y = y;
            this.target.z = z;
            
            const eye = this.position;
            const target = this.target;
            const up = this.up;
            
            let z0 = eye.x - target.x;
            let z1 = eye.y - target.y;
            let z2 = eye.z - target.z;
            
            let len = Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
            if (len > 0) {
                len = 1 / len;
                z0 *= len;
                z1 *= len;
                z2 *= len;
            }
            
            let x0 = up.y * z2 - up.z * z1;
            let x1 = up.z * z0 - up.x * z2;
            let x2 = up.x * z1 - up.y * z0;
            
            len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
            if (len > 0) {
                len = 1 / len;
                x0 *= len;
                x1 *= len;
                x2 *= len;
            }
            
            const y0 = z1 * x2 - z2 * x1;
            const y1 = z2 * x0 - z0 * x2;
            const y2 = z0 * x1 - z1 * x0;
            
            this.matrixWorldInverse = [
                x0, y0, z0, 0,
                x1, y1, z1, 0,
                x2, y2, z2, 0,
                -(x0 * eye.x + x1 * eye.y + x2 * eye.z),
                -(y0 * eye.x + y1 * eye.y + y2 * eye.z),
                -(z0 * eye.x + z1 * eye.y + z2 * eye.z),
                1
            ];
            };
            
            this.updateProjectionMatrix();
        },
        
        Scene: function() {
            this.children = [];
            this.add = function(object) {
            this.children.push(object);
            };
        },
        
        CylinderGeometry: function(radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded) {
            this.vertices = [];
            this.indices = [];
            this.uvs = [];
            
            const radius = radiusTop;
            
            for (let y = 0; y <= heightSegments; y++) {
            const v = y / heightSegments;
            const posY = (v - 0.5) * height;
            
            for (let x = 0; x <= radialSegments; x++) {
                const u = x / radialSegments;
                const theta = u * Math.PI * 2;
                
                const posX = radius * Math.cos(theta);
                const posZ = radius * Math.sin(theta);
                
                this.vertices.push(posX, posY, posZ);
                this.uvs.push(u, 1 - v);
            }
            }
            
            for (let y = 0; y < heightSegments; y++) {
            for (let x = 0; x < radialSegments; x++) {
                const a = y * (radialSegments + 1) + x;
                const b = a + radialSegments + 1;
                
                this.indices.push(a, b, a + 1);
                this.indices.push(b, b + 1, a + 1);
            }
            }
            
            this.scale = function(x, y, z) {
            for (let i = 0; i < this.vertices.length; i += 3) {
                this.vertices[i] *= x;
                this.vertices[i + 1] *= y;
                this.vertices[i + 2] *= z;
            }
            };
        },
        
        TextureLoader: function() {
            this.load = function(url, onLoad, onProgress, onError) {
            const texture = new THREE.Texture();
            const image = new Image();
            
            image.crossOrigin = 'anonymous';
            image.onload = function() {
                texture.image = image;
                texture.needsUpdate = true;
                if (onLoad) onLoad(texture);
            };
            
            image.onerror = function(e) {
                if (onError) onError(e);
            };
            
            image.src = url;
            return texture;
            };
        },
        
        Texture: function() {
            this.image = null;
            this.needsUpdate = false;
        },
        
        MeshBasicMaterial: function(params) {
            this.map = params.map || null;
        },
        
        Mesh: function(geometry, material) {
            this.geometry = geometry;
            this.material = material;
        },
        
        WebGLRenderer: function(params) {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            
            this.domElement = canvas;
            
            let currentTexture = null;
            let shaderProgram = null;
            
            const initShaders = () => {
            const vsSource = \`
                attribute vec3 aPosition;
                attribute vec2 aTexCoord;
                uniform mat4 uProjectionMatrix;
                uniform mat4 uViewMatrix;
                varying vec2 vTexCoord;
                
                void main() {
                vTexCoord = aTexCoord;
                gl_Position = uProjectionMatrix * uViewMatrix * vec4(aPosition, 1.0);
                }
            \`;
            
            const fsSource = \`
                precision mediump float;
                varying vec2 vTexCoord;
                uniform sampler2D uSampler;
                
                void main() {
                gl_FragColor = texture2D(uSampler, vTexCoord);
                }
            \`;
            
            const vs = gl.createShader(gl.VERTEX_SHADER);
            gl.shaderSource(vs, vsSource);
            gl.compileShader(vs);
            
            const fs = gl.createShader(gl.FRAGMENT_SHADER);
            gl.shaderSource(fs, fsSource);
            gl.compileShader(fs);
            
            shaderProgram = gl.createProgram();
            gl.attachShader(shaderProgram, vs);
            gl.attachShader(shaderProgram, fs);
            gl.linkProgram(shaderProgram);
            gl.useProgram(shaderProgram);
            
            shaderProgram.aPosition = gl.getAttribLocation(shaderProgram, 'aPosition');
            shaderProgram.aTexCoord = gl.getAttribLocation(shaderProgram, 'aTexCoord');
            shaderProgram.uProjectionMatrix = gl.getUniformLocation(shaderProgram, 'uProjectionMatrix');
            shaderProgram.uViewMatrix = gl.getUniformLocation(shaderProgram, 'uViewMatrix');
            shaderProgram.uSampler = gl.getUniformLocation(shaderProgram, 'uSampler');
            };
            
            this.setPixelRatio = function(ratio) {
            // Implemented but ratio is handled in setSize
            };
            
            this.setSize = function(width, height) {
            canvas.width = width * (window.devicePixelRatio || 1);
            canvas.height = height * (window.devicePixelRatio || 1);
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            gl.viewport(0, 0, canvas.width, canvas.height);
            };
            
            this.render = function(scene, camera) {
            if (!shaderProgram) initShaders();
            
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.enable(gl.DEPTH_TEST);
            
            scene.children.forEach(mesh => {
                const geo = mesh.geometry;
                const mat = mesh.material;
                
                if (mat.map && mat.map.image && mat.map.needsUpdate) {
                if (!currentTexture) {
                    currentTexture = gl.createTexture();
                }
                gl.bindTexture(gl.TEXTURE_2D, currentTexture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, mat.map.image);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                mat.map.needsUpdate = false;
                }
                
                const posBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(geo.vertices), gl.STATIC_DRAW);
                gl.vertexAttribPointer(shaderProgram.aPosition, 3, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(shaderProgram.aPosition);
                
                const uvBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
                gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(geo.uvs), gl.STATIC_DRAW);
                gl.vertexAttribPointer(shaderProgram.aTexCoord, 2, gl.FLOAT, false, 0, 0);
                gl.enableVertexAttribArray(shaderProgram.aTexCoord);
                
                const idxBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, idxBuffer);
                gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(geo.indices), gl.STATIC_DRAW);
                
                gl.uniformMatrix4fv(shaderProgram.uProjectionMatrix, false, camera.projectionMatrix);
                gl.uniformMatrix4fv(shaderProgram.uViewMatrix, false, camera.matrixWorldInverse);
                
                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, currentTexture);
                gl.uniform1i(shaderProgram.uSampler, 0);
                
                gl.drawElements(gl.TRIANGLES, geo.indices.length, gl.UNSIGNED_SHORT, 0);
            });
            };
        }
        };

        let camera, scene, renderer;
        let isUserInteracting = false;
        let onPointerDownMouseX = 0, onPointerDownMouseY = 0;
        let lon = 0, onPointerDownLon = 0;
        let lat = 0, onPointerDownLat = 0; // Locked at 0 for horizontal-only viewing
        let phi = 0, theta = 0;

        init();
        animate();

        function init() {
        const container = document.getElementById('container');

        camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 1, 1100);
        scene = new THREE.Scene();

        const geometry = new THREE.CylinderGeometry(500, 500, 400, 60, 1, true);
        geometry.scale(-1, 1, -1);

        const texture = new THREE.TextureLoader().load(
            '${base64Image}',
            function() {
            console.log('Texture loaded');
            },
            undefined,
            function(error) {
            console.error('Error loading texture:', error);
            }
        );

        const material = new THREE.MeshBasicMaterial({ map: texture });
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        container.style.touchAction = 'none';
        container.addEventListener('pointerdown', onPointerDown, false);
        container.addEventListener('touchstart', onTouchStart, false);
        window.addEventListener('resize', onWindowResize, false);
        }

        function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function onPointerDown(event) {
        if (event.isPrimary === false) return;
        isUserInteracting = true;
        onPointerDownMouseX = event.clientX;
        onPointerDownMouseY = event.clientY;
        onPointerDownLon = lon;
        onPointerDownLat = lat;
        document.addEventListener('pointermove', onPointerMove, false);
        document.addEventListener('pointerup', onPointerUp, false);
        }

        function onPointerMove(event) {
        if (event.isPrimary === false) return;
        lon = (onPointerDownMouseX - event.clientX) * 0.1 + onPointerDownLon;
        }

        function onPointerUp() {
        if (event.isPrimary === false) return;
        isUserInteracting = false;
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
        }

        function onTouchStart(event) {
        if (event.touches.length === 1) {
            event.preventDefault();
            isUserInteracting = true;
            onPointerDownMouseX = event.touches[0].pageX;
            onPointerDownMouseY = event.touches[0].pageY;
            onPointerDownLon = lon;
            onPointerDownLat = lat;
            document.addEventListener('touchmove', onTouchMove, false);
            document.addEventListener('touchend', onTouchEnd, false);
        }
        }

        function onTouchMove(event) {
        if (event.touches.length === 1) {
            event.preventDefault();
            lon = (onPointerDownMouseX - event.touches[0].pageX) * 0.1 + onPointerDownLon;
        }
        }

        function onTouchEnd(event) {
        isUserInteracting = false;
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchEnd);
        }

        function animate() {
        requestAnimationFrame(animate);
        update();
        }

        function update() {
        if (isUserInteracting === false) {
            lon += 0.05;
        }
        lat = 0;
        phi = THREE.MathUtils.degToRad(90 - lat);
        theta = THREE.MathUtils.degToRad(lon);
        const x = 500 * Math.sin(phi) * Math.cos(theta);
        const y = 500 * Math.cos(phi);
        const z = 500 * Math.sin(phi) * Math.sin(theta);
        camera.lookAt(x, y, z);
        renderer.render(scene, camera);
        }
    </script>
    </body>
    </html>
    `;

    return (
        <WebView
            style={styles.webview}
            source={{ html: htmlContent }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            scrollEnabled={false}
            bounces={false}
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={false}
            originWhitelist={['*']}
        />
    );
};

const styles = StyleSheet.create({
    webview: {
        flex: 1,
        backgroundColor: '#000000',
    },
});
