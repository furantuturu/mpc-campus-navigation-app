import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import { useEffect, useState } from 'react';
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

                setBase64Image(`data:image/webp;base64,${base64}`);
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
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <WebView
                originWhitelist={['*']}
                source={{
                    html: `
                    <!DOCTYPE html>
                    <html>
                    <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css">
                        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"></script>
                        <title>Pannellum Viewer</title>
                        <style>
                            body,
                            html {
                                margin: 0;
                                padding: 0;
                                height: 100%;
                                width: 100%;
                            }

                            #panorama {
                                width: 100%;
                                height: 100vh;
                            }
                        </style>
                    </head>
                    <body>
                        <div id="panorama"></div>
                        <script>
                            pannellum.viewer('panorama', {
                                "type": "equirectangular",
                                "panorama": "${base64Image}",
                                "autoLoad": true,
                                "autoRotate": -2,
                                "showZoomCtrl": false,
                                "minPitch": 0,
                                "maxPitch": 0,
                                "hfov": 30,
                                "vaov": 65,
                            });
                        </script>
                    </body>
                    </html>
                    `,
                }}
                style={styles.webview}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
    },
});