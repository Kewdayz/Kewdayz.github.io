<script>
  // Attachment options based on selected excavator
  var attachmentOptions = {
      "none":["no-attachment"],
    excavator1: ["no-attachment", "hammer"],
    excavator2: ["no-attachment", "hammer", "auger", "tilt-bucket", "grapple", "hydraulic-compaction-plate"],
    excavator3: ["no-attachment", "hammer", "auger", "hard-roll-drill", "grapple", "hydraulic-compaction-plate"],
    excavator4: ["no-attachment", "hammer", "grapple", "ripper", "hydraulic-compaction-plate"],
    excavator5: ["no-attachment", "broom", "asphalt-profiler", "forks"],
  };

  // Attachment rates (per hour)
  var attachmentRates = {
    hammer: {
      excavator1: 30,
      excavator2: 40,
      excavator3: 50,
      excavator4: 60,
    },
    auger: {
      excavator2: 40,
      excavator3: 60,
    },
    "tilt-bucket": {
      excavator2: 15,
    },
    grapple: {
      excavator2: 15,
      excavator3: 20,
      excavator4: 25,
    },
    "hydraulic-compaction-plate": {
      excavator2: 40,
      excavator3: 50,
      excavator4: 60,
    },
    "hard-roll-drill": {
      excavator3: 50,
    },
    broom: {
      excavator5: 50,
    },
    ripper: {
      excavator2: 15,
      excavator3: 20,
      excavator4: 25,
    },
    "asphalt-profiler": {
      excavator5: 80,
    },
    forks: {
      excavator5: 10,
    },
  };
  
  // Float charge options for each excavator
  var floatChargeOptions = {
    excavator1: 250,
    excavator2: 400,
    excavator3: 750,
    excavator4: 890,
    excavator5: 250,
  };

  // JavaScript code for cost calculation
  document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission

    // Get input values
    var excavator = document.getElementById("excavator").value;
	  var tipper = document.getElementById("tipper").value;
    var difficulty = document.getElementById("difficulty").value;
    var duration = document.getElementById("duration").value;
    var attachments = Array.from(document.getElementById("attachments").selectedOptions).map(function (option) {
      return option.value;
    });
    var isNightWork = document.getElementById("night-work").checked;
    var includeFloatCharge = document.getElementById("include-float-charge").checked;
    var includeEscort = document.getElementById("escort").checked;

    // Excavator rates based on size
    var excavatorRates = {
	    "none": 0,
      excavator1: 90,
      excavator2: 100,
      excavator3: 140,
      excavator4: 160,
      excavator5: 110,
    };
	  
	// Tippers rates based on size
var tipperRates = {
	"none": 0,
  "t1": 85,
  "t2": 100,
  "t3": 130,
  "t4": 145,
  "t5": 100,
};  

    // Difficulty level multipliers
    var difficultyMultipliers = {
      easy: 1,
      moderate: 1.1,
      difficult: 1.2,
    };

    // Calculate base cost per hour
    var baseCostPerHour = excavatorRates[excavator] * difficultyMultipliers[difficulty] + tipperRates[tipper];

    // Calculate attachment cost
    var attachmentCost = 0;
    attachments.forEach(function (attachment) {
      if (attachment !== "no-attachment") {
        attachmentCost += attachmentRates[attachment][excavator] || 0;
      }
    });

    // Calculate total cost
    var totalCost = (baseCostPerHour + attachmentCost) * duration;

    // Add float charge if selected
    if (includeFloatCharge) {
      var floatCharge = floatChargeOptions[excavator] || 0;
      totalCost += floatCharge;
    }

    // Add escort charge if selected
    if (includeEscort) {
      totalCost += 220 * 2; 
    }

    // Adjust total cost for night work
    if (isNightWork) {
      totalCost += 30 * duration;
    }

    // Display the result
    document.getElementById("cost-result").innerHTML =
      "Estimated Cost: $" + totalCost.toFixed(2) + "<br>Attachments: " + attachments.join(", ");
  });

  // Update attachment options when excavator is selected
  document.getElementById("excavator").addEventListener("change", function () {
    var excavator = this.value;
    var attachmentsSelect = document.getElementById("attachments");
    var attachments = attachmentOptions.hasOwnProperty(excavator) ? attachmentOptions[excavator] : [];

    // Clear previous attachment options
    attachmentsSelect.innerHTML = "";

    // Create option elements for each attachment
    attachments.forEach(function (attachment) {
      var option = document.createElement("option");
      option.value = attachment;
      option.text = attachment.charAt(0).toUpperCase() + attachment.slice(1);
      attachmentsSelect.appendChild(option);
    });
  });
</script>
