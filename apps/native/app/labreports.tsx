import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import { Ionicons } from '@expo/vector-icons'; // For the attach icon and cross button

const diseasesList: string[] = [
  'Asthma', 'Alzheimer’s', 'Arthritis', 'AIDS', 'Anemia', 'Back Pain', 'Bronchitis', 'Cancer', 'Celiac Disease', 'Chronic Fatigue Syndrome', 'Chronic Obstructive Pulmonary Disease (COPD)', 'Coronary Artery Disease', 'Crohn’s Disease', 'Diabetes Mellitus Type 1', 'Diabetes Mellitus Type 2', 'Epilepsy', 'Fibromyalgia', 'Gout', 'Heart Failure', 'High Blood Pressure', 'Hyperthyroidism', 'Hypothyroidism', 'Irritable Bowel Syndrome (IBS)', 'Kidney Disease', 'Liver Disease', 'Lupus', 'Multiple Sclerosis', 'Osteoporosis', 'Parkinson’s Disease', 'Psoriasis', 'Rheumatoid Arthritis', 'Stroke', 'Tuberculosis', 'Ulcerative Colitis', 'Acid Reflux', 'Acne', 'Acromegaly', 'Actinic Keratosis', 'Addison’s Disease', 'Adenoid Cystic Carcinoma', 'Adenovirus Infection', 'Adrenal Insufficiency', 'Agranulocytosis', 'Alcohol Use Disorder', 'Alcoholic Hepatitis', 'Allergic Asthma', 'Allergic Rhinitis', 'Alpha-1 Antitrypsin Deficiency', 'Alopecia Areata', 'Alport Syndrome', 'Amyloidosis', 'Amyotrophic Lateral Sclerosis (ALS)', 'Anaphylaxis', 'Angina', 'Ankylosing Spondylitis', 'Anthrax', 'Antiphospholipid Syndrome', 'Aortic Aneurysm', 'Aortic Dissection', 'Aortic Stenosis', 'Aphasia', 'Appendicitis', 'Arrhythmia', 'Arteriosclerosis', 'Arteriovenous Malformation', 'Asbestosis', 'Astigmatism', 'Atopic Dermatitis', 'Atrial Fibrillation', 'Atrial Septal Defect', 'Autism Spectrum Disorder', 'Autoimmune Hepatitis', 'Autoimmune Thyroid Disease', 'Babesiosis', 'Bacterial Endocarditis', 'Bacterial Meningitis', 'Bacterial Vaginosis', 'Barrett’s Esophagus', 'Basal Cell Carcinoma', 'Bell’s Palsy', 'Benign Prostatic Hyperplasia', 'Bile Duct Cancer', 'Bipolar Disorder', 'Bladder Cancer', 'Blastomycosis', 'Blood Clot', 'Bone Cancer', 'Borderline Personality Disorder', 'Botulism', 'Bowen’s Disease', 'Brain Abscess', 'Brain Cancer', 'Brain Tumor', 'Brucellosis', 'Budd-Chiari Syndrome', 'Burkitt Lymphoma', 'Burns', 'Bursitis', 'C. Difficile Infection', 'Cachexia', 'Calciphylaxis', 'Campylobacter Infection', 'Cancer of Unknown Primary', 'Carcinoid Tumor', 'Cardiomyopathy', 'Carpal Tunnel Syndrome', 'Cat Scratch Disease', 'Cataracts', 'Cavernous Malformation', 'Celiac Disease', 'Cellulitis', 'Central Sleep Apnea', 'Cerebral Aneurysm', 'Cerebral Palsy', 'Cervical Cancer', 'Cervical Dysplasia', 'Cervicitis', 'Chagas Disease', 'Charcot-Marie-Tooth Disease', 'Chemical Pneumonia', 'Chickenpox', 'Chikungunya', 'Chlamydia', 'Cholangiocarcinoma', 'Cholecystitis', 'Cholera', 'Chronic Bronchitis', 'Chronic Kidney Disease', 'Chronic Myeloid Leukemia', 'Chronic Pancreatitis', 'Chronic Sinusitis', 'Cirrhosis', 'Cleft Lip', 'Cleft Palate', 'Clostridium Perfringens Infection', 'Cluster Headaches', 'Coccidioidomycosis', 'Colon Cancer', 'Colorectal Cancer', 'Common Cold', 'Congenital Adrenal Hyperplasia', 'Congenital Heart Defects', 'Congestive Heart Failure', 'Conjunctivitis', 'Constipation', 'Contact Dermatitis', 'Conversion Disorder', 'Corneal Abrasion', 'Cough', 'Creutzfeldt-Jakob Disease', 'Cryptococcosis', 'Cryptosporidiosis', 'Cushing’s Syndrome', 'Cutaneous T-cell Lymphoma', 'Cystic Fibrosis', 'Cystitis', 'Cytomegalovirus Infection', 'De Quervain’s Tenosynovitis', 'Deep Vein Thrombosis', 'Dengue Fever', 'Dental Caries', 'Dermatitis', 'Dermatomyositis', 'Diabetic Ketoacidosis', 'Diabetic Retinopathy', 'Diarrhea', 'Diffuse Large B-cell Lymphoma', 'Diphtheria', 'Diverticulitis', 'Down Syndrome', 'Dry Eye Syndrome', 'Ductal Carcinoma In Situ', 'Dupuytren’s Contracture', 'Dysentery', 'Dyslipidemia', 'Dysmenorrhea', 'Dyspepsia', 'Dysthymia', 'Ebola Virus Disease', 'Echinococcosis', 'Eclampsia', 'Ectopic Pregnancy', 'Edwards Syndrome', 'Ehlers-Danlos Syndrome', 'Ehrlichiosis', 'Elephantiasis', 'Emphysema', 'Endocarditis', 'Endometrial Cancer', 'Endometriosis', 'Enteritis', 'Epstein-Barr Virus Infection', 'Erythema Multiforme', 'Erythema Nodosum', 'Esophageal Cancer', 'Esophagitis', 'Essential Tremor', 'Ewing Sarcoma', 'Exocrine Pancreatic Insufficiency', 'Eye Infection', 'Fabry Disease', 'Facial Palsy', 'Factor V Leiden', 'Familial Hypercholesterolemia', 'Fanconi Anemia', 'Fasciitis', 'Febrile Seizure', 'Felty Syndrome', 'Fetal Alcohol Syndrome', 'Fifth Disease', 'Fibrosarcoma', 'Fibrosis', 'Flail Chest', 'Flatfoot', 'Follicular Lymphoma', 'Food Poisoning', 'Fragile X Syndrome', 'Friedreich’s Ataxia', 'Frontotemporal Dementia', 'Frostbite', 'Fungal Nail Infection', 'Galactosemia', 'Gallbladder Cancer', 'Gangrene', 'Gardner Syndrome', 'Gastroenteritis', 'Gastroesophageal Reflux Disease', 'Gaucher Disease', 'Genital Herpes', 'Genital Warts', 'Giant Cell Arteritis', 'Giardiasis', 'Gilbert’s Syndrome', 'Gingivitis', 'Glioblastoma', 'Glioma', 'Glomerulonephritis', 'Glucose-6-Phosphate Dehydrogenase Deficiency', 'Goiter', 'Graves’ Disease', 'Guillain-Barré Syndrome', 'Gum Disease', 'Haemophilus Influenzae Infection', 'Hairy Cell Leukemia', 'Hand-Foot-And-Mouth Disease', 'Hantavirus Pulmonary Syndrome', 'Hashimoto’s Thyroiditis', 'Hay Fever', 'Head Lice', 'Heart Attack', 'Heart Block', 'Heart Disease', 'Heart Failure', 'Heat Exhaustion', 'Heat Stroke', 'Helicobacter Pylori Infection', 'Hemangioma', 'Hemolytic Anemia', 'Hemophilia', 'Hemorrhoids', 'Henoch-Schönlein Purpura', 'Hepatitis A', 'Hepatitis B', 'Hepatitis C', 'Hepatocellular Carcinoma', 'Hernia', 'Herpes Simplex', 'Herpes Zoster', 'Hiatal Hernia', 'Hidradenitis Suppurativa', 'Hirschsprung’s Disease', 'Histoplasmosis', 'HIV Infection', 'Hodgkin’s Lymphoma', 'Human Papillomavirus Infection', 'Huntington’s Disease', 'Hydrocele', 'Hydrocephalus', 'Hypercalcemia', 'Hyperemesis Gravidarum', 'Hyperglycemia', 'Hypertension', 'Hyperthyroidism', 'Hyponatremia', 'Hypoparathyroidism', 'Ichthyosis', 'Impetigo', 'Infectious Mononucleosis', 'Influenza', 'Insomnia', 'Interstitial Cystitis', 'Iron Deficiency Anemia', 'Ischemic Colitis', 'Ischemic Stroke', 'Jaundice', 'Juvenile Idiopathic Arthritis', 'Kaposi Sarcoma', 'Kawasaki Disease', 'Kidney Stones', 'Krabbe Disease', 'Kyphosis', 'Laryngeal Cancer', 'Laryngitis', 'Latent Tuberculosis', 'Legionnaires’ Disease', 'Leishmaniasis', 'Leprosy', 'Leukemia', 'Leukocytosis', 'Lewy Body Dementia', 'Lichen Planus', 'Lipoma', 'Liposarcoma', 'Liver Cancer', 'Liver Disease', 'Lobar Pneumonia', 'Long QT Syndrome', 'Low Back Pain', 'Lumbar Spinal Stenosis', 'Lung Cancer', 'Lupus', 'Lymphoma', 'Malaria', 'Malignant Hyperthermia', 'Malignant Melanoma', 'Marfan Syndrome', 'Mastitis', 'Measles', 'Melanoma', 'Meniere’s Disease', 'Meningioma', 'Meningitis', 'Mental Illness', 'Mercury Poisoning', 'Mesenteric Ischemia', 'Mesothelioma', 'Metabolic Syndrome', 'Microcephaly', 'Migraine', 'Mitochondrial Disease', 'Molar Pregnancy', 'Molluscum Contagiosum', 'Mononucleosis', 'Motor Neuron Disease', 'Mouth Cancer', 'Mucopolysaccharidosis', 'Mumps', 'Multiple Myeloma', 'Muscular Dystrophy', 'Myasthenia Gravis', 'Mycosis Fungoides', 'Myelodysplastic Syndrome', 'Myelofibrosis', 'Myeloma', 'Myocardial Infarction', 'Myocarditis', 'Myopia', 'Myxedema', 'Naegleria Infection', 'Nasal Polyps', 'Nephrotic Syndrome', 'Neuroblastoma', 'Neurofibromatosis', 'Neurogenic Bladder', 'Neuropathy', 'Neutropenia', 'Niemann-Pick Disease', 'Night Blindness', 'Non-Hodgkin’s Lymphoma', 'Non-Small Cell Lung Cancer', 'Norovirus Infection', 'Obesity', 'Obsessive-Compulsive Disorder', 'Osteoarthritis', 'Osteogenesis Imperfecta', 'Osteomyelitis', 'Osteonecrosis', 'Osteoporosis', 'Otitis Externa', 'Otitis Media', 'Ovarian Cancer', 'Ovarian Cyst', 'Overactive Bladder', 'Paget’s Disease of Bone', 'Pancreatic Cancer', 'Pancreatitis', 'Panic Disorder', 'Parainfluenza', 'Paranoid Personality Disorder', 'Parasitic Infection', 'Parkinson’s Disease', 'Paronychia', 'Parotitis', 'Patent Ductus Arteriosus', 'Peptic Ulcer Disease', 'Pericarditis', 'Periodontal Disease', 'Peripheral Artery Disease', 'Peripheral Neuropathy', 'Peritonitis', 'Pertussis', 'Phenylketonuria', 'Phlebitis', 'Pheochromocytoma', 'Phimosis', 'Pilonidal Cyst', 'Pinworm Infection', 'Pituitary Tumor', 'Plantar Fasciitis', 'Pleurisy', 'Plummer-Vinson Syndrome', 'Pneumococcal Disease', 'Pneumonia', 'Pneumothorax', 'Polio', 'Polycystic Kidney Disease', 'Polycystic Ovary Syndrome', 'Polycythemia Vera', 'Polymyalgia Rheumatica', 'Polymyositis', 'Postpartum Depression', 'Post-Traumatic Stress Disorder', 'Pre-eclampsia', 'Precocious Puberty', 'Prediabetes', 'Prostate Cancer', 'Prostatitis', 'Psoriasis', 'Psoriatic Arthritis', 'Pulmonary Embolism', 'Pulmonary Fibrosis', 'Pulmonary Hypertension', 'Pyloric Stenosis', 'Q Fever', 'Rabies', 'Raynaud’s Disease', 'Reactive Arthritis', 'Rectal Cancer', 'Reflux Esophagitis', 'Reiter’s Syndrome', 'Renal Cell Carcinoma', 'Respiratory Syncytial Virus Infection', 'Restless Legs Syndrome', 'Retinal Detachment', 'Retinitis Pigmentosa', 'Retinoblastoma', 'Rhabdomyosarcoma', 'Rheumatic Fever', 'Rheumatoid Arthritis', 'Rhinovirus Infection', 'Rickets', 'Ringworm', 'Rocky Mountain Spotted Fever', 'Roseola', 'Rotavirus Infection', 'Rubella', 'Sacral Agenesis', 'Salmonella Infection', 'Sarcoidosis', 'Sarcoma', 'Scabies', 'Scarlet Fever', 'Schizophrenia', 'Sciatica', 'Scleroderma', 'Scoliosis', 'Seborrheic Dermatitis', 'Seizure', 'Septic Arthritis', 'Septicemia', 'Severe Acute Respiratory Syndrome', 'Shigellosis', 'Shingles', 'Shoulder Impingement Syndrome', 'Sickle Cell Anemia', 'Sinusitis', 'Sjogren’s Syndrome', 'Skin Cancer', 'Sleep Apnea', 'Small Intestinal Bacterial Overgrowth', 'Smallpox', 'Soft Tissue Sarcoma', 'Spina Bifida', 'Spinal Muscular Atrophy', 'Spondylolisthesis', 'Staphylococcal Infection', 'Stomach Cancer', 'Stroke', 'Sudden Infant Death Syndrome', 'Syphilis', 'Systemic Lupus Erythematosus', 'Takayasu Arteritis', 'Tay-Sachs Disease', 'Temporal Arteritis', 'Tendinitis', 'Tension Headache', 'Testicular Cancer', 'Tetanus', 'Thalassemia', 'Throat Cancer', 'Thrombocytopenia', 'Thrombophlebitis', 'Thyroid Cancer', 'Thyroid Disease', 'Tinnitus', 'Toxoplasmosis', 'Tracheoesophageal Fistula', 'Tracheomalacia', 'Tracheostomy', 'Transverse Myelitis', 'Tuberculosis', 'Turner Syndrome', 'Ulcerative Colitis', 'Urinary Tract Infection', 'Uterine Cancer', 'Varicose Veins', 'Vitiligo', 'Von Willebrand Disease', 'Zika Virus',
];

export default function DiseaseSelectionScreen() {
  const [diseaseQuery, setDiseaseQuery] = useState<string>('');  // Explicitly typing as string
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]);  // Explicitly typing as string array
  const [selectedDocument, setSelectedDocument] = useState<DocumentPicker.DocumentResult | null>(null);  // For the selected document
  const router = useRouter();

  const handlePress = () => {
    router.push('/familyjoin');  // Navigate to the next page
  };

  const handleDiseaseSearch = (query: string) => {  // Explicitly typing query as a string
    setDiseaseQuery(query);
  };

  const handleDiseaseSelect = (disease: string) => {  // Explicitly typing disease as a string
    if (!selectedDiseases.includes(disease)) {
      setSelectedDiseases([...selectedDiseases, disease]);  // Add selected disease to state
    }
    setDiseaseQuery(''); // Clear the input after selecting a disease
  };

  const handleDiseaseRemove = (disease: string) => {
    setSelectedDiseases(selectedDiseases.filter(d => d !== disease));  // Remove disease from the state
  };

  const filteredDiseases = diseasesList.filter((disease: string) =>
    disease.toLowerCase().startsWith(diseaseQuery.toLowerCase())
  );

  // Compute showSuggestions dynamically
  const showSuggestions = diseaseQuery.length > 0 && filteredDiseases.length > 0;

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    // Check if the user canceled the picker
    if (result && result.uri) {
      setSelectedDocument(result);
    }
  };

  return (
    <LinearGradient colors={['#E0F7FA', '#FFFFFF']} style={styles.container}>
      {/* Step 3 Image */}
      <Image
        source={require('../assets/images/Step 3.png')}
        style={styles.stepImage}
      />

      <View style={styles.leftColumn}>
        {/* Disease Selection Header */}
        <Text style={styles.headerTitle}>Medical History</Text>

        {/* Search for Diseases */}
        <Text style={styles.sectionTitle}>Mention any illness you have.</Text>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputText}
            placeholder="Search for diseases..."
            value={diseaseQuery}
            onChangeText={handleDiseaseSearch}
          />

          {/* Suggestions Dropdown */}
          {showSuggestions && (
            <LinearGradient colors={['#E0F7FA', '#FFFFFF']} style={styles.suggestionsContainer}>
              <FlatList
                data={filteredDiseases}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleDiseaseSelect(item)} style={styles.diseaseOption}>
                    <Text style={styles.diseaseText}>{item}</Text>
                  </TouchableOpacity>
                )}
                keyboardShouldPersistTaps="always" // Ensures taps are registered
              />
            </LinearGradient>
          )}
        </View>

        {/* Display Selected Diseases */}
        <View style={styles.selectedDiseasesContainer}>
          {selectedDiseases.map((disease, index) => (
            <View key={index} style={styles.selectedDisease}>
              <Text style={styles.selectedDiseaseText}>{disease}</Text>
              <TouchableOpacity onPress={() => handleDiseaseRemove(disease)}>
                <Ionicons name="close-circle-outline" size={20} color="#007BFF" style={styles.crossIcon} />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {/* Attach Blood Report Section */}
        <Text style={styles.sectionDescription}>
          Attach your blood report{'\n'}here for a detailed analysis.
        </Text>

        {/* Attach File Button */}
        <TouchableOpacity onPress={pickDocument} style={styles.attachButton}>
          <Text style={styles.attachButtonText}>Attach Files</Text>
          <Ionicons name="attach-outline" size={20} color="#007BFF" style={styles.attachIcon} />
        </TouchableOpacity>

        {/* Display Selected Document */}
        {selectedDocument && (
          <View style={styles.selectedDocumentContainer}>
            <View style={styles.selectedDocument}>
              <Text style={styles.selectedDocumentText}>{selectedDocument.name}</Text>
              <TouchableOpacity onPress={() => setSelectedDocument(null)}>
                <Ionicons name="close-circle-outline" size={20} color="#007BFF" style={styles.crossIcon} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      {/* Next Button (centered and 80% of screen width) */}
      <TouchableOpacity style={styles.nextButton} onPress={handlePress}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  // Your existing styles remain unchanged
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  leftColumn: {
    flex: 1,
    paddingHorizontal: 30,
    marginRight: 20,
    justifyContent: 'flex-start',
  },
  stepImage: {
    position: 'absolute',
    right: -400,
    top: '25%',
    width: 550,
    height: 550,
    resizeMode: 'contain',
  },
  headerTitle: {
    paddingTop: 70,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 30,
    marginBottom: 60,
  },
  sectionTitle: {
    fontSize: 22,
    color: '#000',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  inputWrapper: {
    position: 'relative',
    zIndex: 1,
  },
  inputText: {
    width: '75%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    color: '#000',
  },
  suggestionsContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    width: '75%',
    borderRadius: 15,
    elevation: 5,
    maxHeight: 200,
    zIndex: 10,
    overflow: 'hidden',
  },
  diseaseOption: {
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  diseaseText: {
    fontSize: 16,
    color: '#000',
  },
  selectedDiseasesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 30,
    width: '80%',
  },
  selectedDisease: {
    backgroundColor: '#E0F7FA',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  selectedDiseaseText: {
    color: '#000',
    fontSize: 14,
    marginRight: 5,
  },
  crossIcon: {
    opacity: 0.6,
  },
  sectionDescription: {
    fontSize: 21,
    color: '#000',
    marginBottom: 20,
    fontWeight: 'bold',
    lineHeight: 22,
  },
  attachButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#007BFF',
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginBottom: 20,
    width: 150,
    justifyContent: 'center',
  },
  attachButtonText: {
    color: '#007BFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  attachIcon: {
    marginLeft: 0,
  },
  // Styles for selected document
  selectedDocumentContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 30,
    width: '80%',
  },
  selectedDocument: {
    backgroundColor: '#E0F7FA',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
  selectedDocumentText: {
    color: '#000',
    fontSize: 14,
    marginRight: 5,
  },
  nextButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    width: '80%',
    borderRadius: 25,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
