// Load environment variables
import 'dotenv/config';
import { db } from './db';
import { crops, diseases } from '../shared/schema';

async function seedDatabase() {
  console.log('🌱 Starting database seeding...');

  try {
    // Seed crops
    console.log('📦 Seeding crops...');
    const cropData = [
      {
        nameHindi: 'गेहूं',
        nameEnglish: 'Wheat',
        scientificName: 'Triticum aestivum',
        category: 'rabi',
        sowingTime: 'नवंबर-दिसंबर',
        temperature: '15-25°C',
        waterRequirement: '400-500 मिमी',
        imageUrl: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b'
      },
      {
        nameHindi: 'चावल',
        nameEnglish: 'Rice',
        scientificName: 'Oryza sativa',
        category: 'kharif',
        sowingTime: 'जून-जुलाई',
        temperature: '20-30°C',
        waterRequirement: '1200-1500 मिमी',
        imageUrl: 'https://images.unsplash.com/photo-1536431311719-398b6704d4cc'
      },
      {
        nameHindi: 'गन्ना',
        nameEnglish: 'Sugarcane',
        scientificName: 'Saccharum officinarum',
        category: 'cash_crop',
        sowingTime: 'अक्टूबर-नवंबर',
        temperature: '20-35°C',
        waterRequirement: '1500-2000 मिमी',
        imageUrl: 'https://images.unsplash.com/photo-1560493676-04071c5f467b'
      },
      {
        nameHindi: 'कपास',
        nameEnglish: 'Cotton',
        scientificName: 'Gossypium hirsutum',
        category: 'kharif',
        sowingTime: 'अप्रैल-मई',
        temperature: '21-27°C',
        waterRequirement: '500-800 मिमी',
        imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96'
      },
      {
        nameHindi: 'मक्का',
        nameEnglish: 'Maize',
        scientificName: 'Zea mays',
        category: 'kharif',
        sowingTime: 'जून-जुलाई',
        temperature: '20-30°C',
        waterRequirement: '500-800 मिमी',
        imageUrl: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae'
      },
      {
        nameHindi: 'सोयाबीन',
        nameEnglish: 'Soybean',
        scientificName: 'Glycine max',
        category: 'kharif',
        sowingTime: 'जून-जुलाई',
        temperature: '20-30°C',
        waterRequirement: '450-700 मिमी',
        imageUrl: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad'
      }
    ];

    const insertedCrops = await db.insert(crops).values(cropData).returning();
    console.log(`✅ Inserted ${insertedCrops.length} crops`);

    // Seed diseases for each crop
    console.log('🦠 Seeding diseases...');
    const diseaseData = [];

    for (const crop of insertedCrops) {
      let diseaseInfo;
      
      switch (crop.nameEnglish) {
        case 'Wheat':
          diseaseInfo = {
            nameHindi: 'गेहूं का रतुआ',
            nameEnglish: 'Wheat Rust',
            scientificName: 'Puccinia triticina',
            severity: 'medium' as const,
            type: 'fungal' as const,
            symptoms: {
              hindi: [
                'पत्तियों पर नारंगी-भूरे रंग के छोटे धब्बे',
                'धब्बे धीरे-धीरे बड़े होते जाते हैं',
                'पत्तियां पीली पड़कर सूखने लगती हैं'
              ],
              english: [
                'Small orange-brown spots on leaves',
                'Spots gradually increase in size',
                'Leaves turn yellow and dry up'
              ]
            },
            treatment: {
              hindi: [
                'प्रोपिकोनाज़ोल का छिड़काव करें',
                'संक्रमित पत्तियों को हटाएं',
                '10-15 दिन बाद दोबारा छिड़काव'
              ],
              english: [
                'Spray propiconazole',
                'Remove infected leaves',
                'Repeat spray after 10-15 days'
              ]
            }
          };
          break;
        case 'Rice':
          diseaseInfo = {
            nameHindi: 'धान का झुलसा रोग',
            nameEnglish: 'Rice Blast',
            scientificName: 'Magnaporthe oryzae',
            severity: 'high' as const,
            type: 'fungal' as const,
            symptoms: {
              hindi: [
                'पत्तियों पर भूरे धब्बे',
                'धब्बों के चारों ओर पीला किनारा',
                'बाली में दाने काले पड़ जाते हैं'
              ],
              english: [
                'Brown spots on leaves',
                'Yellow margins around spots',
                'Grains turn black in panicles'
              ]
            },
            treatment: {
              hindi: [
                'ट्राइसाइक्लाजोल का छिड़काव',
                'पानी की मात्रा नियंत्रित करें',
                'प्रतिरोधी किस्म का चुनाव'
              ],
              english: [
                'Spray tricyclazole',
                'Control water levels',
                'Choose resistant varieties'
              ]
            }
          };
          break;
        case 'Cotton':
          diseaseInfo = {
            nameHindi: 'कपास का बॉलवर्म',
            nameEnglish: 'Bollworm',
            scientificName: 'Helicoverpa armigera',
            severity: 'high' as const,
            type: 'pest' as const,
            symptoms: {
              hindi: [
                'फूलों और फलियों में छेद',
                'कीट दिखाई देना',
                'पत्तियों का कटना'
              ],
              english: [
                'Holes in flowers and bolls',
                'Visible larvae',
                'Leaf cutting damage'
              ]
            },
            treatment: {
              hindi: [
                'बीटी कपास का उपयोग करें',
                'नीम का तेल छिड़कें',
                'हाथ से कीट पकड़कर नष्ट करें'
              ],
              english: [
                'Use Bt cotton',
                'Spray neem oil',
                'Hand pick and destroy larvae'
              ]
            }
          };
          break;
        case 'Maize':
          diseaseInfo = {
            nameHindi: 'मक्का का पत्ती झुलसा',
            nameEnglish: 'Leaf Blight',
            scientificName: 'Bipolaris maydis',
            severity: 'medium' as const,
            type: 'fungal' as const,
            symptoms: {
              hindi: [
                'पत्तियों पर लंबे धब्बे',
                'धब्बे भूरे से काले रंग के',
                'पौधे की वृद्धि रुकना'
              ],
              english: [
                'Long spots on leaves',
                'Brown to black colored spots',
                'Stunted plant growth'
              ]
            },
            treatment: {
              hindi: [
                'मैंकोजेब का छिड़काव',
                'संक्रमित पत्तियों को हटाएं',
                'फसल चक्र अपनाएं'
              ],
              english: [
                'Spray mancozeb',
                'Remove infected leaves',
                'Follow crop rotation'
              ]
            }
          };
          break;
        default:
          diseaseInfo = {
            nameHindi: `${crop.nameHindi} का सामान्य रोग`,
            nameEnglish: `${crop.nameEnglish} Common Disease`,
            scientificName: 'Various pathogens',
            severity: 'low' as const,
            type: 'fungal' as const,
            symptoms: {
              hindi: [
                'पत्तियों पर धब्बे',
                'पीले या भूरे निशान',
                'पौधे की वृद्धि रुकना'
              ],
              english: [
                'Spots on leaves',
                'Yellow or brown marks',
                'Stunted plant growth'
              ]
            },
            treatment: {
              hindi: [
                'फफूंदनाशी का छिड़काव',
                'संक्रमित भागों को हटाएं',
                'उचित देखभाल करें'
              ],
              english: [
                'Apply fungicide',
                'Remove infected parts',
                'Proper crop care'
              ]
            }
          };
      }

      diseaseData.push({
        cropId: crop.id,
        nameHindi: diseaseInfo.nameHindi,
        nameEnglish: diseaseInfo.nameEnglish,
        scientificName: diseaseInfo.scientificName,
        severity: diseaseInfo.severity,
        type: diseaseInfo.type,
        symptoms: diseaseInfo.symptoms,
        causes: {
          hindi: ['अधिक नमी', 'गर्म मौसम', 'खराब जल निकासी'],
          english: ['High humidity', 'Warm weather', 'Poor drainage']
        },
        treatment: diseaseInfo.treatment,
        prevention: {
          hindi: ['प्रतिरोधी किस्मों का चुनाव', 'उचित फसल चक्र', 'खेत की सफाई'],
          english: ['Choose resistant varieties', 'Proper crop rotation', 'Field sanitation']
        },
        images: [
          'https://images.unsplash.com/photo-1628126235206-5260b9ea6441',
          'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8',
          'https://images.unsplash.com/photo-1595576508898-0ad5c879a061'
        ]
      });
    }

    const insertedDiseases = await db.insert(diseases).values(diseaseData).returning();
    console.log(`✅ Inserted ${insertedDiseases.length} diseases`);

    console.log('🎉 Database seeding completed successfully!');
    console.log(`📊 Summary:`);
    console.log(`   - Crops: ${insertedCrops.length}`);
    console.log(`   - Diseases: ${insertedDiseases.length}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

// Run the seed function
seedDatabase()
  .then(() => {
    console.log('✅ Seeding process completed');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  });