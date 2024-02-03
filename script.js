document.addEventListener("DOMContentLoaded", function() {
    const matrix = document.getElementById("matrix");
    const info = document.getElementById("info");
    
    // Function to calculate DEC range correctly for each cell
    const calculateDecRange = (index) => {
      if (index === 4) {
        // Special handling for E row, which spans from 170 to 10 across the 180/0 boundary
        return "170-10";
      } else if (index > 4) {
        // For rows below E, adjust ranges to wrap correctly from 180 to 0
        let start = (index - 5) * 20 + 10;
        let end = (index - 4) * 20 + 10;
        return `${start}-${end}`;
      } else {
        // For rows above E, simply calculate based on index
        let start = 90 + index * 20;
        let end = start + 20;
        // Adjust for the range that goes beyond 180 to loop back
        if (end > 180) {
          end = end - 180;
          start = start - 180;
        }
        return `${start}-${end}`;
      }
    };
    
    for (let dec = 0; dec < 9; dec++) {
      for (let ra = 1; ra <= 18; ra++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        const raRange = `${20 * (ra - 1)}-${20 * ra}`;
        const decLabel = String.fromCharCode(65 + dec); // Convert 0-8 to A-I
        const decRange = calculateDecRange(dec);
        cell.textContent = `${decLabel}${ra < 10 ? '0' : ''}${ra}`;
        cell.onmouseover = function() {
          info.textContent = `RA: ${raRange}, DEC: ${decRange}`;
        };
        matrix.appendChild(cell);
      }
    }
  });
  