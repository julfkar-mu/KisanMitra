import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  hi: {
    translation: {
      // Header
      appName: "कृषि सहायक",
      appSubtitle: "Crop Disease Expert",
      login: "प्रवेश करें",
      logout: "लॉगआउट",
      
      // Navigation
      home: "मुख्य",
      scan: "स्कैन",
      saved: "सहेजे गए",
      profile: "प्रोफाइल",
      
      // Home page
      heroTitle: "फसल रोग पहचान और उपचार",
      heroSubtitle: "अपनी फसल को स्वस्थ रखने के लिए विशेषज्ञ सलाह पाएं",
      getStarted: "शुरू करें",
      
      // Stats
      cropsCount: "{{count}}+ फसलें",
      cropsDesc: "विभिन्न प्रकार की फसलों की जानकारी",
      diseasesCount: "{{count}}+ रोग",
      diseasesDesc: "आम फसल रोगों की पहचान",
      farmersCount: "{{count}}+ किसान",
      farmersDesc: "हमारे साथ जुड़े हुए किसान",
      
      // Crop categories
      cropCategories: "फसल श्रेणियां",
      viewAll: "सभी देखें",
      
      // Quick disease identifier
      quickIdentify: "तुरंत रोग पहचान",
      quickIdentifyDesc: "फसल की तस्वीर अपलोड करें और तुरंत रोग की पहचान करें",
      takePhoto: "फोटो लें",
      uploadPhoto: "अपलोड करें",
      
      // Crop seasons
      rabi: "रबी",
      kharif: "खरीफ",
      cashCrop: "नकदी फसल",
      
      // Common diseases count
      commonDiseases: "{{count}} आम रोग",
      
      // Crop details
      sowingTime: "बुआई का समय",
      temperature: "तापमान",
      waterRequirement: "पानी की आवश्यकता",
      
      // Tabs
      care: "देखभाल",
      diseases: "रोग",
      nutrition: "पोषण",
      symptoms: "लक्षण",
      causes: "कारण",
      treatment: "उपचार",
      prevention: "रोकथाम",
      
      // Disease severity
      low: "कम",
      medium: "मध्यम",
      high: "गंभीर",
      critical: "अत्यधिक गंभीर",
      
      // Disease types
      fungal: "कवक जनित",
      bacterial: "जीवाणु जनित",
      viral: "विषाणु जनित",
      pest: "कीट जनित",
      
      // Feedback
      feedbackTitle: "आपकी राय हमारे लिए महत्वपूर्ण है",
      feedbackDesc: "इस जानकारी के बारे में अपना अनुभव साझा करें",
      name: "नाम",
      enterName: "अपना नाम लिखें",
      mobileNumber: "मोबाइल नंबर",
      rating: "रेटिंग",
      comment: "टिप्पणी",
      commentPlaceholder: "अपनी राय या सुझाव लिखें...",
      submitFeedback: "फीडबैक भेजें",
      
      // Auth
      mobileLogin: "मोबाइल नंबर से लॉगिन करें",
      otpDesc: "हम आपके मोबाइल नंबर पर OTP भेजेंगे",
      sendOtp: "OTP भेजें",
      cancel: "रद्द करें",
      
      // Loading
      loading: "लोड हो रहा है...",
      pleaseWait: "कृपया प्रतीक्षा करें",
      
      // Admin
      adminPanel: "एडमिन पैनल",
      adminDesc: "फसल और रोग की जानकारी प्रबंधित करें",
      cropManagement: "फसल प्रबंधन",
      diseaseManagement: "रोग प्रबंधन",
      users: "उपयोगकर्ता",
      feedback: "फीडबैक",
      addNewCrop: "नई फसल जोड़ें",
      cropNameHindi: "फसल का नाम (हिंदी)",
      cropNameEnglish: "Crop Name (English)",
      scientificName: "वैज्ञानिक नाम",
      cropDescription: "फसल का विवरण",
      cropDescPlaceholder: "फसल के बारे में विस्तृत जानकारी लिखें...",
      save: "सहेजें",
      
      // Error messages
      errorFetchingCrops: "फसलों की जानकारी लाने में त्रुटि",
      errorFetchingDiseases: "रोगों की जानकारी लाने में त्रुटि",
      errorSubmittingFeedback: "फीडबैक भेजने में त्रुटि",
      tryAgain: "फिर से कोशिश करें",
      
      // Empty states
      noCropsFound: "कोई फसल नहीं मिली",
      noDiseasesFound: "कोई रोग नहीं मिला",
      noFeedbackFound: "कोई फीडबैक नहीं मिला",
    }
  },
  en: {
    translation: {
      // Header
      appName: "Krishi Sahayak",
      appSubtitle: "कृषि रोग विशेषज्ञ",
      login: "Login",
      logout: "Logout",
      
      // Navigation
      home: "Home",
      scan: "Scan",
      saved: "Saved",
      profile: "Profile",
      
      // Home page
      heroTitle: "Crop Disease Identification & Treatment",
      heroSubtitle: "Get expert advice to keep your crops healthy",
      getStarted: "Get Started",
      
      // Stats
      cropsCount: "{{count}}+ Crops",
      cropsDesc: "Information on various types of crops",
      diseasesCount: "{{count}}+ Diseases",
      diseasesDesc: "Common crop disease identification",
      farmersCount: "{{count}}+ Farmers",
      farmersDesc: "Farmers connected with us",
      
      // Crop categories
      cropCategories: "Crop Categories",
      viewAll: "View All",
      
      // Quick disease identifier
      quickIdentify: "Quick Disease Identification",
      quickIdentifyDesc: "Upload crop image and identify diseases instantly",
      takePhoto: "Take Photo",
      uploadPhoto: "Upload",
      
      // Crop seasons
      rabi: "Rabi",
      kharif: "Kharif",
      cashCrop: "Cash Crop",
      
      // Common diseases count
      commonDiseases: "{{count}} Common Diseases",
      
      // Crop details
      sowingTime: "Sowing Time",
      temperature: "Temperature",
      waterRequirement: "Water Requirement",
      
      // Tabs
      care: "Care",
      diseases: "Diseases",
      nutrition: "Nutrition",
      symptoms: "Symptoms",
      causes: "Causes",
      treatment: "Treatment",
      prevention: "Prevention",
      
      // Disease severity
      low: "Low",
      medium: "Medium",
      high: "High",
      critical: "Critical",
      
      // Disease types
      fungal: "Fungal",
      bacterial: "Bacterial",
      viral: "Viral",
      pest: "Pest",
      
      // Feedback
      feedbackTitle: "Your feedback is important to us",
      feedbackDesc: "Share your experience about this information",
      name: "Name",
      enterName: "Enter your name",
      mobileNumber: "Mobile Number",
      rating: "Rating",
      comment: "Comment",
      commentPlaceholder: "Write your feedback or suggestions...",
      submitFeedback: "Submit Feedback",
      
      // Auth
      mobileLogin: "Login with Mobile Number",
      otpDesc: "We will send OTP to your mobile number",
      sendOtp: "Send OTP",
      cancel: "Cancel",
      
      // Loading
      loading: "Loading...",
      pleaseWait: "Please wait",
      
      // Admin
      adminPanel: "Admin Panel",
      adminDesc: "Manage crop and disease information",
      cropManagement: "Crop Management",
      diseaseManagement: "Disease Management",
      users: "Users",
      feedback: "Feedback",
      addNewCrop: "Add New Crop",
      cropNameHindi: "फसल का नाम (हिंदी)",
      cropNameEnglish: "Crop Name (English)",
      scientificName: "Scientific Name",
      cropDescription: "Crop Description",
      cropDescPlaceholder: "Write detailed information about the crop...",
      save: "Save",
      
      // Error messages
      errorFetchingCrops: "Error fetching crops",
      errorFetchingDiseases: "Error fetching diseases",
      errorSubmittingFeedback: "Error submitting feedback",
      tryAgain: "Try Again",
      
      // Empty states
      noCropsFound: "No crops found",
      noDiseasesFound: "No diseases found",
      noFeedbackFound: "No feedback found",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'hi', // Default to Hindi
    fallbackLng: 'hi',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
