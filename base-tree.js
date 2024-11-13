<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tree Rendering</title>
    <style>
        body { display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
        canvas { background-color: #f0f8ff; }
    </style>
</head>
<body>
    <canvas id="treeCanvas" width="800" height="600"></canvas>

    <script>
        const canvas = document.getElementById('treeCanvas');
        const ctx = canvas.getContext('2d');

        function drawTree(x, y, length, angle, branchWidth, color1, color2) {
            ctx.beginPath();
            ctx.save();

            ctx.strokeStyle = color1;
            ctx.fillStyle = color2;
            ctx.lineWidth = branchWidth;

            // Move to the start of the branch
            ctx.translate(x, y);
            ctx.rotate(angle * Math.PI / 180);
            ctx.moveTo(0, 0);
            ctx.lineTo(0, -length);
            ctx.stroke();

            // Recur to draw more branches
            if (length < 10) {
                ctx.restore();
                return;
            }

            // Draw right branch
            drawTree(0, -length, length * 0.7, angle + 15, branchWidth * 0.7, color1, color2);

            // Draw left branch
            drawTree(0, -length, length * 0.7, angle - 15, branchWidth * 0.7, color1, color2);

            ctx.restore();
        }

        // Render the tree
        function renderTree() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const startX = canvas.width / 2;
            const startY = canvas.height - 80;
            const trunkLength = 120;
            const trunkWidth = 15;
            drawTree(startX, startY, trunkLength, 0, trunkWidth, 'saddlebrown', 'green');
        }

        renderTree();
    </script>
</body>
</html>
