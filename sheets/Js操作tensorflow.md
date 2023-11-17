---
tags: [tensorflow,js]
title: Js操作tensorflow
---


## KNN分类器

一个基于tensorflow的实时的调用摄像头的，可以在网页端运行。

新建`.html`并将下方代码复制进去，用浏览器打开即可。

请在联网环境下用先进的浏览器打开

1. 等待模型加载（加载完成后会提示使用摄像头）

2. 点击Add A则获取当前摄像头截图加入A训练集

3. 以此类推添加B、C训练集

4. 观察屏幕输出的预测结果

``` html

<html><head>
    <!-- Load the latest version of TensorFlow.js -->
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet"></script>
    <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/knn-classifier"></script>
</head>

<body>
    <div style="text-align:center">
        <div id="console"></div>
        <!-- Add an image that we will use to test -->
        <video autoplay="" playsinline="" muted="" id="webcam" width="224" height="224"></video>
        <br>
        <button id="class-a">Add A</button>
        <button id="class-b">Add B</button>
        <button id="class-c">Add C</button>
    </div>
    <script>
        const classifier = knnClassifier.create();
        const webcamElement = document.getElementById('webcam');

        async function app() {
            console.log('Loading mobilenet..');

            // Load the model.
            net = await mobilenet.load();
            console.log('Successfully loaded model');

            // Create an object from Tensorflow.js data API which could capture image
            // from the web camera as Tensor.
            const webcam = await tf.data.webcam(webcamElement);

            // Reads an image from the webcam and associates it with a specific class
            // index.
            const addExample = async classId => {
                // Capture an image from the web camera.
                const img = await webcam.capture();

                // Get the intermediate activation of MobileNet 'conv_preds' and pass that
                // to the KNN classifier.
                const activation = net.infer(img, true);

                // Pass the intermediate activation to the classifier.
                classifier.addExample(activation, classId);

                // Dispose the tensor to release the memory.
                img.dispose();
            };

            // When clicking a button, add an example for that class.
            document.getElementById('class-a').addEventListener('click', () => addExample(0));
            document.getElementById('class-b').addEventListener('click', () => addExample(1));
            document.getElementById('class-c').addEventListener('click', () => addExample(2));

            while (true) {
                if (classifier.getNumClasses() > 0) {
                    const img = await webcam.capture();

                    // Get the activation from mobilenet from the webcam.
                    const activation = net.infer(img, 'conv_preds');
                    // Get the most likely class and confidence from the classifier module.
                    const result = await classifier.predictClass(activation);

                    const classes = ['A', 'B', 'C'];
                    document.getElementById('console').innerText = `
    prediction: ${classes[result.label]}\n
    probability: ${result.confidences[result.label]}
    `;

                    // Dispose the tensor to release the memory.
                    img.dispose();
                }

                await tf.nextFrame();
            }
        }

        app();
    </script>


</body></html>

```
