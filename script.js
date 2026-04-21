// ===== SECTION NAVIGATION =====
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
        window.scrollTo(0, 0);
    }
}

// Set home as active on page load
window.addEventListener('DOMContentLoaded', function() {
    showSection('home');
});

// ===== CROP PREDICTION LOGIC =====
const cropDatabase = {
    rice: {
        name: 'Rice (Chawal)',
        soilTypes: ['clay', 'alluvial'],
        waterNeeds: ['high', 'medium'],
        seasons: ['kharif'],
        rainfallMin: 600,
        rainfallMax: 2500,
        tempMin: 20,
        tempMax: 35,
        phMin: 5.5,
        phMax: 7.5,
        suitability: 'Very Good',
        steps: [
            'Make field wet with water',
            'Plant seeds in small area first (nursery)',
            'Move young plants to main field after 25-30 days',
            'Keep water 5-7 cm above ground always',
            'Give urea 3 times during growing',
            'Cut rice when grains are hard and dry'
        ],
        requirements: {
            nitrogen: '120-150 kg/acre',
            phosphorus: '40-60 kg/acre',
            potassium: '40-60 kg/acre',
            organic: '5-10 tons FYM/acre',
            irrigation: '8-10 irrigations'
        },
        avgYield: '40-60 quintals/acre',
        priceRange: '₹1500-2500/quintal'
    },

    wheat: {
        name: 'Wheat (Gehu)',
        soilTypes: ['alluvial', 'clay', 'black'],
        waterNeeds: ['high', 'medium'],
        seasons: ['rabi'],
        rainfallMin: 400,
        rainfallMax: 1000,
        tempMin: 15,
        tempMax: 25,
        phMin: 6.5,
        phMax: 8.0,
        suitability: 'Very Good',
        steps: [
            'Prepare field 2-3 weeks before',
            'Plant seeds in lines 20-22 cm apart',
            'Water 1st time after 21 days',
            'Water 2nd time after 40-45 days',
            'Water 3rd time after 65 days',
            'Cut wheat when grains turn brown and hard'
        ],
        requirements: {
            nitrogen: '100-120 kg/acre',
            phosphorus: '50-60 kg/acre',
            potassium: '40-50 kg/acre',
            organic: '5-8 tons FYM/acre',
            irrigation: '3-4 irrigations'
        },
        avgYield: '35-50 quintals/acre',
        priceRange: '₹1800-2200/quintal'
    },

    sugarcane: {
        name: 'Sugarcane (Ganna)',
        soilTypes: ['black', 'alluvial', 'red'],
        waterNeeds: ['high'],
        seasons: ['kharif'],
        rainfallMin: 800,
        rainfallMax: 2500,
        tempMin: 20,
        tempMax: 30,
        phMin: 5.5,
        phMax: 8.0,
        suitability: 'Very Good',
        steps: [
            'Use healthy sugarcane pieces (10-12 months old)',
            'Plant 45cm x 90cm apart',
            'Plant in June-July',
            'Water 6-8 times for 12 months',
            'Give fertilizer 3 times during growth',
            'Cut when color changes to brown'
        ],
        requirements: {
            nitrogen: '120-150 kg/acre',
            phosphorus: '60-80 kg/acre',
            potassium: '60-80 kg/acre',
            organic: '10-15 tons FYM/acre',
            irrigation: '6-8 irrigations'
        },
        avgYield: '50-70 tons/acre',
        priceRange: '₹2500-3500/ton'
    },

    cotton: {
        name: 'Cotton (Kapas)',
        soilTypes: ['black', 'red', 'laterite'],
        waterNeeds: ['medium'],
        seasons: ['kharif'],
        rainfallMin: 500,
        rainfallMax: 1500,
        tempMin: 21,
        tempMax: 35,
        phMin: 6.0,
        phMax: 8.5,
        suitability: 'Very Good',
        steps: [
            'Use good cotton seeds',
            'Plant 90cm x 60cm apart',
            'Plant in June-July',
            'Water when dry',
            'Pick off extra branches at 6-7 weeks',
            'Pick cotton from December when pods open'
        ],
        requirements: {
            nitrogen: '120-150 kg/acre',
            phosphorus: '50-60 kg/acre',
            potassium: '40-50 kg/acre',
            organic: '5 tons FYM/acre',
            irrigation: '4-6 irrigations'
        },
        avgYield: '8-12 quintals/acre',
        priceRange: '₹4500-7000/quintal'
    },

    maize: {
        name: 'Maize (Maka)',
        soilTypes: ['alluvial', 'red', 'black'],
        waterNeeds: ['high', 'medium'],
        seasons: ['kharif', 'summer'],
        rainfallMin: 400,
        rainfallMax: 1200,
        tempMin: 18,
        tempMax: 28,
        phMin: 6.0,
        phMax: 7.5,
        suitability: 'Good',
        steps: [
            'Use hybrid maize seeds',
            'Prepare field 2 weeks before',
            'Plant with 60cm x 25cm spacing',
            'Water 1st time after 20-25 days',
            'Water 2nd time after 40-45 days',
            'Pick maize when grain turns hard'
        ],
        requirements: {
            nitrogen: '100-120 kg/acre',
            phosphorus: '40-50 kg/acre',
            potassium: '30-40 kg/acre',
            organic: '4-5 tons FYM/acre',
            irrigation: '2-3 irrigations'
        },
        avgYield: '30-45 quintals/acre',
        priceRange: '₹1500-2000/quintal'
    },

    soybean: {
        name: 'Soybean (Soyabean)',
        soilTypes: ['black', 'red', 'alluvial'],
        waterNeeds: ['medium'],
        seasons: ['kharif'],
        rainfallMin: 600,
        rainfallMax: 1500,
        tempMin: 20,
        tempMax: 30,
        phMin: 6.0,
        phMax: 7.5,
        suitability: 'Good',
        steps: [
            'Use good soybean seeds',
            'Prepare field with good drainage',
            'Plant 45cm x 20cm apart',
            'Plant in June-July',
            'Water during dry times',
            'Pick in November-December when pods dry'
        ],
        requirements: {
            nitrogen: '20-40 kg/acre',
            phosphorus: '40-50 kg/acre',
            potassium: '30-40 kg/acre',
            organic: '4-5 tons FYM/acre',
            irrigation: '2-3 irrigations'
        },
        avgYield: '15-20 quintals/acre',
        priceRange: '₹3500-4500/quintal'
    },

    onion: {
        name: 'Onion (Pyaz)',
        soilTypes: ['alluvial', 'sandy', 'black'],
        waterNeeds: ['high'],
        seasons: ['rabi', 'summer'],
        rainfallMin: 400,
        rainfallMax: 1000,
        tempMin: 15,
        tempMax: 25,
        phMin: 6.0,
        phMax: 7.5,
        suitability: 'Very Good',
        steps: [
            'Use onion seeds or sets',
            'Grow young plants in small area for 45-60 days',
            'Move to main field 15cm x 10cm apart',
            'Keep soil wet always',
            'Water often but lightly',
            'Pick when leaves turn dry and brown'
        ],
        requirements: {
            nitrogen: '80-100 kg/acre',
            phosphorus: '50-60 kg/acre',
            potassium: '40-50 kg/acre',
            organic: '8-10 tons FYM/acre',
            irrigation: '10-12 irrigations'
        },
        avgYield: '150-200 quintals/acre',
        priceRange: '₹800-1500/quintal'
    },

    tomato: {
        name: 'Tomato (Tamatar)',
        soilTypes: ['alluvial', 'red', 'black'],
        waterNeeds: ['high'],
        seasons: ['rabi', 'summer'],
        rainfallMin: 400,
        rainfallMax: 1000,
        tempMin: 18,
        tempMax: 28,
        phMin: 6.0,
        phMax: 7.5,
        suitability: 'Very Good',
        steps: [
            'Grow young plants in nursery for 45-60 days',
            'Move to field 60cm x 45cm apart',
            'Use good hybrid seeds',
            'Tie plants to sticks',
            'Keep soil wet',
            'Pick fruit when color starts to turn red'
        ],
        requirements: {
            nitrogen: '100-150 kg/acre',
            phosphorus: '60-80 kg/acre',
            potassium: '80-100 kg/acre',
            organic: '10-15 tons FYM/acre',
            irrigation: '15-20 irrigations'
        },
        avgYield: '200-300 quintals/acre',
        priceRange: '₹1000-2500/quintal'
    },

    pulses: {
        name: 'Pulses - Gram/Lentil (Chana/Masoor)',
        soilTypes: ['black', 'red', 'alluvial'],
        waterNeeds: ['low', 'medium'],
        seasons: ['rabi'],
        rainfallMin: 300,
        rainfallMax: 800,
        tempMin: 10,
        tempMax: 25,
        phMin: 6.5,
        phMax: 8.0,
        suitability: 'Good',
        steps: [
            'Prepare field with good drainage',
            'Plant 20-25 kg seeds per acre',
            'Plant 45cm x 10cm apart',
            'Plant in October-November',
            'Water if no rain in dry time',
            'Pick in March-April when pods dry'
        ],
        requirements: {
            nitrogen: '20-40 kg/acre',
            phosphorus: '40-50 kg/acre',
            potassium: '30-40 kg/acre',
            organic: '3-5 tons FYM/acre',
            irrigation: '1-2 irrigations'
        },
        avgYield: '15-20 quintals/acre',
        priceRange: '₹3000-5000/quintal'
    },

    jowar: {
        name: 'Jowar - Sorghum (Jwar)',
        soilTypes: ['red', 'black', 'laterite'],
        waterNeeds: ['low', 'medium'],
        seasons: ['kharif', 'rabi'],
        rainfallMin: 400,
        rainfallMax: 1000,
        tempMin: 20,
        tempMax: 35,
        phMin: 6.0,
        phMax: 8.0,
        suitability: 'Good',
        steps: [
            'Use good jowar seeds',
            'Prepare field and add manure',
            'Plant 45cm x 15cm apart',
            'Plant in June-July',
            'Need less water (dry resistant)',
            'Pick in September-October when grain hard'
        ],
        requirements: {
            nitrogen: '60-80 kg/acre',
            phosphorus: '30-40 kg/acre',
            potassium: '30-40 kg/acre',
            organic: '3-5 tons FYM/acre',
            irrigation: '2-3 irrigations'
        },
        avgYield: '15-25 quintals/acre',
        priceRange: '₹1200-1800/quintal'
    },

    sugarbeet: {
        name: 'Sugar Beet (Shakar Ganthir)',
        soilTypes: ['alluvial', 'black'],
        waterNeeds: ['high'],
        seasons: ['rabi'],
        rainfallMin: 400,
        rainfallMax: 1000,
        tempMin: 10,
        tempMax: 22,
        phMin: 6.0,
        phMax: 8.0,
        suitability: 'Good',
        steps: [
            'Use good sugar beet seeds',
            'Prepare field with rows (ridge and furrow)',
            'Plant 45cm x 20cm apart',
            'Plant in September-October',
            'Keep soil wet',
            'Dig when leaves turn yellow (5-6 months)'
        ],
        requirements: {
            nitrogen: '100-120 kg/acre',
            phosphorus: '50-60 kg/acre',
            potassium: '60-80 kg/acre',
            organic: '8-10 tons FYM/acre',
            irrigation: '4-6 irrigations'
        },
        avgYield: '300-400 quintals/acre',
        priceRange: '₹300-500/quintal'
    },

    groundnut: {
        name: 'Groundnut (Moongfali)',
        soilTypes: ['sandy', 'red', 'alluvial'],
        waterNeeds: ['medium'],
        seasons: ['kharif', 'summer'],
        rainfallMin: 400,
        rainfallMax: 1200,
        tempMin: 20,
        tempMax: 30,
        phMin: 6.0,
        phMax: 8.0,
        suitability: 'Good',
        steps: [
            'Use healthy groundnut pods as seeds',
            'Prepare field by 2-3 ploughings',
            'Plant 30cm x 10cm apart',
            'Plant in May-June',
            'Water during flowering time',
            'Pull plants when mature (4-5 months)'
        ],
        requirements: {
            nitrogen: '20-40 kg/acre',
            phosphorus: '40-50 kg/acre',
            potassium: '30-40 kg/acre',
            organic: '4-5 tons FYM/acre',
            irrigation: '3-4 irrigations'
        },
        avgYield: '15-25 quintals/acre',
        priceRange: '₹3500-5000/quintal'
    }
};

// ===== PREDICTION FUNCTION =====
function predictCrop() {
    // Get form values
    const area = parseFloat(document.getElementById('area').value);
    const soil = document.getElementById('soil').value;
    const water = document.getElementById('water').value;
    const season = document.getElementById('season').value;
    const rainfall = parseFloat(document.getElementById('rainfall').value);
    const tempRange = document.getElementById('temp').value;
    const soilPH = parseFloat(document.getElementById('soilPH').value);
    const lastCrop = document.getElementById('lastCrop').value;

    // Validate inputs
    if (!area || !soil || !water || !season || !rainfall || !tempRange || !soilPH) {
        alert('Please fill all boxes first!');
        return;
    }

    // Parse temperature range
    const tempParts = tempRange.split('-');
    const tempMin = parseFloat(tempParts[0]);
    const tempMax = parseFloat(tempParts[1]);

    // Score each crop
    const scores = {};
    let suitableCrops = [];

    for (const [cropKey, crop] of Object.entries(cropDatabase)) {
        let score = 0;
        let matchCount = 0;

        // Check soil type
        if (crop.soilTypes.includes(soil)) {
            score += 20;
            matchCount++;
        }

        // Check water availability
        if (crop.waterNeeds.includes(water)) {
            score += 20;
            matchCount++;
        }

        // Check season
        if (crop.seasons.includes(season)) {
            score += 20;
            matchCount++;
        }

        // Check rainfall range
        if (rainfall >= crop.rainfallMin && rainfall <= crop.rainfallMax) {
            score += 15;
            matchCount++;
        }

        // Check temperature range
        if (tempMin >= crop.tempMin && tempMax <= crop.tempMax) {
            score += 15;
            matchCount++;
        }

        // Check pH level
        if (soilPH >= crop.phMin && soilPH <= crop.phMax) {
            score += 10;
            matchCount++;
        }

        // Only consider crops with at least 3 matching factors
        if (matchCount >= 3 && score > 40) {
            scores[cropKey] = score;
            suitableCrops.push({ key: cropKey, score: score });
        }
    }

    // Sort by score (descending)
    suitableCrops.sort((a, b) => b.score - a.score);

    // Display results
    const resultsSection = document.getElementById('results');
    const cropRecommendations = document.getElementById('cropRecommendations');
    cropRecommendations.innerHTML = '';

    if (suitableCrops.length === 0) {
        resultsSection.classList.remove('hidden');
        cropRecommendations.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #d9534f; padding: 20px;">We cannot find good crops for your farm. Please try again with different information.</p>';
    } else {
        // Show top 3 recommendations
        const topCrops = suitableCrops.slice(0, 3);
        
        topCrops.forEach((item, index) => {
            const crop = cropDatabase[item.key];
            const suitabilityColor = item.score >= 80 ? '#27ae60' : item.score >= 60 ? '#f39c12' : '#e74c3c';
            
            const cropHTML = `
                <div class="crop-card">
                    <h3>${index + 1}. ${crop.name}</h3>
                    <div class="suitability" style="border-left: 4px solid ${suitabilityColor}; background: ${suitabilityColor}20;">
                        ${crop.suitability} Match (Score: ${item.score}/100)
                    </div>

                    <div class="requirements">
                        <h4>📊 How Much You Will Get:</h4>
                        <ul>
                            <li><strong>You can get:</strong> ${crop.avgYield}</li>
                            <li><strong>Price in market:</strong> ${crop.priceRange}</li>
                        </ul>
                    </div>

                    <div class="requirements">
                        <h4>📋 What Fertilizer to Use:</h4>
                        <ul>
                            <li><strong>Urea:</strong> ${crop.requirements.nitrogen}</li>
                            <li><strong>DAP:</strong> ${crop.requirements.phosphorus}</li>
                            <li><strong>MOP:</strong> ${crop.requirements.potassium}</li>
                            <li><strong>Cow dung/Compost:</strong> ${crop.requirements.organic}</li>
                            <li><strong>Water:</strong> ${crop.requirements.irrigation}</li>
                        </ul>
                    </div>

                    <div class="steps">
                        <h4>📝 Simple Steps:</h4>
                        <ol>
                            ${crop.steps.map(step => `<li>${step}</li>`).join('')}
                        </ol>
                    </div>
                </div>
            `;
            
            cropRecommendations.innerHTML += cropHTML;
        });

        resultsSection.classList.remove('hidden');
    }

    // Scroll to results
    resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ===== FORM SUBMISSION =====
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('farmForm');
    if (form) {
        form.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                predictCrop();
            }
        });
    }
});
