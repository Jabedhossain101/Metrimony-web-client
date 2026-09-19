import { z } from "zod";

export const basicInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  dob: z.string().min(1, "Date of birth is required."),
  biodataType: z.enum(["male", "female"], {
    errorMap: () => ({ message: "Please select a biodata type." }),
  }),
  sect: z.string().min(1, "Please select your sect/religion."),
  practiceLevel: z.string().min(1, "Please select your practice level."),
  maritalStatus: z.string().min(1, "Please select your marital status."),
  profileImage: z.string().url("Must be a valid image URL."),
  privacySetting: z.enum(["public", "accepted_only", "blurred"], {
    errorMap: () => ({ message: "Please select a privacy setting." }),
  }),
});

export const educationProfessionSchema = z.object({
  educationLevel: z.string().min(1, "Education level is required."),
  occupation: z.string().min(1, "Occupation is required."),
  incomeRange: z.string().min(1, "Please specify an income range."),
});

export const familyDetailsSchema = z.object({
  fathersName: z.string().min(2, "Father's name is required."),
  mothersName: z.string().min(2, "Mother's name is required."),
  familyType: z.string().min(1, "Family type is required."),
  familyValues: z.string().min(1, "Family values are required."),
  permanentDivision: z.string().min(1, "Permanent division is required."),
  presentDivision: z.string().min(1, "Present division is required."),
});

export const lifestyleExpectationsSchema = z.object({
  height: z.string().min(1, "Height is required."),
  weight: z.string().min(1, "Weight is required."),
  race: z.string().min(1, "Skin color is required."),
  diet: z.string().min(1, "Dietary habits are required."),
  expectedPartnerAge: z.coerce.number().min(18, "Age must be at least 18.").max(100, "Age must be realistic."),
  expectedPartnerHeight: z.string().min(1, "Expected partner height is required."),
  expectedPartnerWeight: z.string().min(1, "Expected partner weight is required."),
  mobileNumber: z.string().min(10, "Mobile number must be at least 10 digits."),
});

export const combinedBiodataSchema = basicInfoSchema
  .merge(educationProfessionSchema)
  .merge(familyDetailsSchema)
  .merge(lifestyleExpectationsSchema);

