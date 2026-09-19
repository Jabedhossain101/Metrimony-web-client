import React, { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { combinedBiodataSchema } from '../lib/validations/biodataSchema';
import { AuthContext } from '../Contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Check, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router';

const STEPS = [
  { id: 1, name: 'Basic Info', fields: ['name', 'dob', 'biodataType', 'sect', 'practiceLevel', 'maritalStatus', 'profileImage', 'privacySetting'] },
  { id: 2, name: 'Education', fields: ['educationLevel', 'occupation', 'incomeRange'] },
  { id: 3, name: 'Family', fields: ['fathersName', 'mothersName', 'familyType', 'familyValues', 'permanentDivision', 'presentDivision'] },
  { id: 4, name: 'Lifestyle', fields: ['height', 'weight', 'race', 'diet', 'expectedPartnerAge', 'expectedPartnerHeight', 'expectedPartnerWeight', 'mobileNumber'] }
];

const MultiStepBiodataWizard = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(combinedBiodataSchema),
    mode: 'onTouched'
  });

  const privacySetting = watch('privacySetting', 'public');
  const profileImage = watch('profileImage', '');

  useEffect(() => {
    if (!user?.email) return;
    fetch(`https://metrimony-server-ten.vercel.app/biodatas/me?email=${user.email}`)
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data) setAlreadySubmitted(true);
      })
      .catch(err => console.error('Check failed:', err));
  }, [user?.email]);

  const nextStep = async () => {
    const fieldsToValidate = STEPS[currentStep - 1].fields;
    const isStepValid = await trigger(fieldsToValidate);
    if (isStepValid) {
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const onSubmit = async (data) => {
    if (!user?.email) {
      toast.error('❌ User not logged in');
      return;
    }
    
    setIsSubmitting(true);
    const payload = { ...data, contactEmail: user.email };

    try {
      const res = await fetch('https://metrimony-server-ten.vercel.app/biodatas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success('🎉 Biodata submitted successfully!');
        setAlreadySubmitted(true);
        navigate('/dashboard');
      } else {
        const err = await res.json();
        toast.error(err.message || '❌ Submission failed');
      }
    } catch (error) {
      toast.error('❌ Server error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPercentage = (currentStep / STEPS.length) * 100;

  if (alreadySubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-12 text-center bg-card rounded-3xl shadow-xl mt-12 border border-border">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 text-primary">
          <Check size={40} />
        </div>
        <h2 className="text-3xl font-serif font-bold text-foreground mb-4">Biodata Submitted!</h2>
        <p className="text-muted-foreground mb-8">You have already submitted your biodata. You can view or edit it from your dashboard.</p>
        <button onClick={() => navigate('/dashboard')} className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all">
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-card rounded-[2rem] shadow-2xl overflow-hidden mt-8 border border-border">
      {/* Header & Progress */}
      <div className="bg-secondary/30 p-8 border-b border-border">
        <h2 className="text-3xl font-serif font-bold text-foreground mb-6 text-center">Complete Your Profile</h2>
        
        {/* Progress Bar */}
        <div className="relative pt-1">
          <div className="flex mb-2 items-center justify-between">
            <div>
              <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary/10">
                Step {currentStep} of {STEPS.length}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold inline-block text-primary">
                {Math.round(progressPercentage)}%
              </span>
            </div>
          </div>
          <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary"
            />
          </div>
        </div>

        {/* Stepper Labels */}
        <div className="hidden sm:flex justify-between mt-2">
          {STEPS.map(step => (
            <div key={step.id} className={`text-xs font-medium ${currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'}`}>
              {step.name}
            </div>
          ))}
        </div>
      </div>

      <div className="p-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {currentStep === 1 && <BasicInfoStep register={register} errors={errors} profileImage={profileImage} privacySetting={privacySetting} />}
              {currentStep === 2 && <EducationProfessionStep register={register} errors={errors} />}
              {currentStep === 3 && <FamilyDetailsStep register={register} errors={errors} />}
              {currentStep === 4 && <LifestyleExpectationsStep register={register} errors={errors} />}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-8 mt-8 border-t border-border">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-semibold transition-all ${currentStep === 1 ? 'opacity-0 pointer-events-none' : 'bg-secondary text-foreground hover:bg-secondary/80'}`}
            >
              <ChevronLeft size={18} /> Back
            </button>
            
            {currentStep < STEPS.length ? (
              <button
                type="button"
                onClick={nextStep}
                className="flex items-center gap-2 px-8 py-2.5 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all"
              >
                Next <ChevronRight size={18} />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-8 py-2.5 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Complete Profile'} <Check size={18} />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

// --- STEP COMPONENTS ---

const InputField = ({ label, name, register, errors, type = "text", placeholder }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-foreground">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      {...register(name)}
      className={`w-full px-4 py-2.5 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${errors[name] ? 'border-destructive' : 'border-border'}`}
    />
    {errors[name] && <p className="text-xs text-destructive mt-1">{errors[name].message}</p>}
  </div>
);

const SelectField = ({ label, name, register, errors, options }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-foreground">{label}</label>
    <select
      {...register(name)}
      className={`w-full px-4 py-2.5 rounded-xl border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${errors[name] ? 'border-destructive' : 'border-border'}`}
    >
      <option value="">Select...</option>
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
    {errors[name] && <p className="text-xs text-destructive mt-1">{errors[name].message}</p>}
  </div>
);

const BasicInfoStep = ({ register, errors, profileImage, privacySetting }) => {
  const isBlurred = privacySetting === 'blurred';
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Full Name" name="name" register={register} errors={errors} placeholder="John Doe" />
        <InputField label="Date of Birth" name="dob" register={register} errors={errors} type="date" />
        
        <SelectField label="Biodata Type" name="biodataType" register={register} errors={errors} options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' }
        ]} />
        
        <SelectField label="Marital Status" name="maritalStatus" register={register} errors={errors} options={[
          { value: 'single', label: 'Single' },
          { value: 'divorced', label: 'Divorced' },
          { value: 'widowed', label: 'Widowed' }
        ]} />

        <InputField label="Sect / Religion" name="sect" register={register} errors={errors} placeholder="e.g., Sunni, Shia" />
        
        <SelectField label="Practice Level" name="practiceLevel" register={register} errors={errors} options={[
          { value: 'practicing', label: 'Practicing' },
          { value: 'moderately', label: 'Moderately Practicing' },
          { value: 'not_practicing', label: 'Not Practicing' }
        ]} />
      </div>

      <div className="pt-6 border-t border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Profile Photo & Privacy</h3>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1 space-y-6 w-full">
            <InputField label="Profile Image URL" name="profileImage" register={register} errors={errors} placeholder="https://..." />
            
            <div className="p-4 bg-secondary/30 rounded-xl border border-border">
              <label className="text-sm font-medium text-foreground block mb-3 flex items-center gap-2">
                <ShieldCheck size={16} className="text-primary" /> Privacy Setting
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" value="public" {...register('privacySetting')} className="text-primary focus:ring-primary" />
                  <span className="text-sm text-foreground">Visible to all</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" value="accepted_only" {...register('privacySetting')} className="text-primary focus:ring-primary" />
                  <span className="text-sm text-foreground">Visible only to accepted requests</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" value="blurred" {...register('privacySetting')} className="text-primary focus:ring-primary" />
                  <span className="text-sm text-foreground">Blurred until permitted</span>
                </label>
              </div>
              {errors.privacySetting && <p className="text-xs text-destructive mt-1">{errors.privacySetting.message}</p>}
            </div>
          </div>
          
          <div className="w-32 h-32 md:w-40 md:h-40 shrink-0 bg-secondary rounded-2xl border-2 border-border overflow-hidden flex items-center justify-center relative shadow-sm">
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Preview" 
                className={`w-full h-full object-cover transition-all duration-300 ${isBlurred ? 'blur-md grayscale' : ''}`}
                onError={(e) => e.target.style.display = 'none'}
              />
            ) : (
              <span className="text-xs text-muted-foreground text-center p-2">Image Preview</span>
            )}
            {isBlurred && profileImage && (
              <div className="absolute inset-0 bg-background/20 flex items-center justify-center">
                <ShieldCheck className="text-white drop-shadow-md" size={32} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const EducationProfessionStep = ({ register, errors }) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputField label="Highest Education Level" name="educationLevel" register={register} errors={errors} placeholder="e.g., BSc in Computer Science" />
      <InputField label="Current Occupation" name="occupation" register={register} errors={errors} placeholder="e.g., Software Engineer" />
      
      <SelectField label="Monthly Income Range" name="incomeRange" register={register} errors={errors} options={[
        { value: 'under_30k', label: 'Under 30,000 BDT' },
        { value: '30k_to_60k', label: '30,000 - 60,000 BDT' },
        { value: '60k_to_100k', label: '60,000 - 100,000 BDT' },
        { value: 'above_100k', label: 'Above 100,000 BDT' },
        { value: 'prefer_not_to_say', label: 'Prefer not to say' }
      ]} />
    </div>
  </div>
);

const FamilyDetailsStep = ({ register, errors }) => {
  const divisions = ['Dhaka', 'Chattagram', 'Rangpur', 'Barisal', 'Khulna', 'Mymensingh', 'Sylhet', 'Rajshahi'].map(d => ({ value: d, label: d }));
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Father's Name & Occupation" name="fathersName" register={register} errors={errors} placeholder="e.g., John Sr. (Retired)" />
        <InputField label="Mother's Name & Occupation" name="mothersName" register={register} errors={errors} placeholder="e.g., Jane (Homemaker)" />
        
        <SelectField label="Family Type" name="familyType" register={register} errors={errors} options={[
          { value: 'nuclear', label: 'Nuclear' },
          { value: 'joint', label: 'Joint' }
        ]} />
        
        <SelectField label="Family Values" name="familyValues" register={register} errors={errors} options={[
          { value: 'traditional', label: 'Traditional' },
          { value: 'moderate', label: 'Moderate' },
          { value: 'liberal', label: 'Liberal' }
        ]} />
        
        <SelectField label="Permanent Division" name="permanentDivision" register={register} errors={errors} options={divisions} />
        <SelectField label="Present Division" name="presentDivision" register={register} errors={errors} options={divisions} />
      </div>
    </div>
  );
};

const LifestyleExpectationsStep = ({ register, errors }) => (
  <div className="space-y-8">
    <div>
      <h3 className="text-lg font-semibold text-foreground mb-4">Your Physical Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label={'Height (e.g., 5\' 8")'} name="height" register={register} errors={errors} placeholder={'5\' 8"'} />
        <InputField label="Weight (kg)" name="weight" register={register} errors={errors} placeholder="70 kg" />
        
        <SelectField label="Skin Color" name="race" register={register} errors={errors} options={[
          { value: 'fair', label: 'Fair' },
          { value: 'medium', label: 'Medium' },
          { value: 'dark', label: 'Dark' }
        ]} />
        
        <InputField label="Dietary Habits" name="diet" register={register} errors={errors} placeholder="e.g., Halal only, Vegetarian" />
      </div>
    </div>
    
    <div className="pt-6 border-t border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">Partner Expectations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="Expected Age" name="expectedPartnerAge" type="number" register={register} errors={errors} placeholder="e.g., 25" />
        <InputField label="Expected Height" name="expectedPartnerHeight" register={register} errors={errors} placeholder={'e.g., 5\' 4"'} />
        <InputField label="Expected Weight" name="expectedPartnerWeight" register={register} errors={errors} placeholder="e.g., 55 kg" />
      </div>
    </div>
    
    <div className="pt-6 border-t border-border">
      <h3 className="text-lg font-semibold text-foreground mb-4">Contact Information</h3>
      <InputField label="Mobile Number" name="mobileNumber" register={register} errors={errors} placeholder="+8801..." />
    </div>
  </div>
);

export default MultiStepBiodataWizard;
