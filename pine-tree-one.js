<!DOCTYPE html>
<html>
<head>
    <style>
        canvas {
            background: #1a1a1a;
            display: block;
            margin: 0 auto;
        }
    </style>
</head>
<body>
    <canvas id="canvas" width="400" height="500"></canvas>
    <script>
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');

        const snowflakes = Array(100).fill().map(() => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2,
            speed: Math.random() * 1 + 0.2
        }));

        function drawBranch(startX, startY, length, angle, depth) {
            if (depth <= 0) return;

            const endX = startX + Math.cos(angle) * length;
            const endY = startY + Math.sin(angle) * length;

            // Main branch
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.strokeStyle = '#3A2718';
            ctx.lineWidth = Math.max(depth * 1.5, 1);
            ctx.stroke();

            // Pine needles
            const needleLength = length * 0.2;
            const needleCount = Math.floor(length / 3);
            ctx.strokeStyle = '#0B4619';
            ctx.lineWidth = 1;

            for (let i = 0; i < needleCount; i++) {
                const t = i / needleCount;
                const branchX = startX + (endX - startX) * t;
                const branchY = startY + (endY - startY) * t;
                
                // Draw needles in a V pattern
                const needleSpread = Math.PI / 4;
                const needleAngle1 = angle + Math.PI/2 + needleSpread;
                const needleAngle2 = angle + Math.PI/2 - needleSpread;
                
                ctx.beginPath();
                ctx.moveTo(branchX, branchY);
                ctx.lineTo(
                    branchX + Math.cos(needleAngle1) * needleLength,
                    branchY + Math.sin(needleAngle1) * needleLength
                );
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(branchX, branchY);
                ctx.lineTo(
                    branchX + Math.cos(needleAngle2) * needleLength,
                    branchY + Math.sin(needleAngle2) * needleLength
                );
                ctx.stroke();
            }

            // Only add small variations for sub-branches
            const numSubBranches = 2;
            const smallSpread = Math.PI / 12; // Much smaller spread angle
            
            for (let i = 0; i < numSubBranches; i++) {
                const newLength = length * 0.6;
                const subAngle = angle + smallSpread * (i === 0 ? -1 : 1);
                drawBranch(endX, endY, newLength, subAngle, depth - 1);
            }
        }

        function drawTree() {
            // Trunk
            ctx.beginPath();
            ctx.moveTo(200, 450);
            ctx.lineTo(200, 350);
            ctx.strokeStyle = '#3A2718';
            ctx.lineWidth = 15;
            ctx.stroke();

            const numLayers = 15;
            const maxWidth = 160; // Maximum width of the tree at base
            
            for (let i = 0; i < numLayers; i++) {
                const y = 360 + (i * -20); // Height between layers
                const layerWidth = maxWidth * (1 - i/numLayers); // Width decreases linearly with height
                const baseLength = layerWidth / 2;
                
                // Calculate angle based on desired cone shape
                const rightAngle = -Math.PI/8; // 30 degrees up from horizontal
                const leftAngle = -Math.PI + Math.PI/8; // Mirror of right angle
                
                // Draw two main branches at this layer
                drawBranch(200, y, baseLength, leftAngle, 2);
                drawBranch(200, y, baseLength, rightAngle, 2);
                
                // Add some intermediate branches for fuller appearance
                const numIntermediateBranches = 2;
                for (let j = 1; j <= numIntermediateBranches; j++) {
                    const t = j / (numIntermediateBranches + 1);
                    const leftIntermediateAngle = leftAngle + (Math.PI/6) * t;
                    const rightIntermediateAngle = rightAngle - (Math.PI/6) * t;
                    
                    drawBranch(200, y, baseLength * 0.8, leftIntermediateAngle, 2);
                    drawBranch(200, y, baseLength * 0.8, rightIntermediateAngle, 2);
                }
            }
        }

        function updateSnow() {
            snowflakes.forEach(snowflake => {
                snowflake.y += snowflake.speed;
                if (snowflake.y > canvas.height) {
                    snowflake.y = 0;
                    snowflake.x = Math.random() * canvas.width;
                }
            });
        }

        function drawSnow() {
            ctx.fillStyle = '#fff';
            snowflakes.forEach(snowflake => {
                ctx.beginPath();
                ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
                ctx.fill();
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawTree();
            updateSnow();
            drawSnow();
            requestAnimationFrame(animate);
        }

        animate();
    </script>
</body>
</html>
