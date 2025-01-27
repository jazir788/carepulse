"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField } from "@/components/ui/form";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { useState } from "react";
import { PatientFormValidation, UserFormValidation } from "@/lib/validation";
import "react-phone-number-input/style.css";
import { createUser } from "@/lib/actions/patient.actions";
import { useRouter } from "next/navigation";
import { FormFieldType } from "./PatientForm";
import { RadioGroup } from "@radix-ui/react-radio-group";
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from "@/constants";
import { RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { Select, SelectItem } from "../ui/select";
import FileUploader from "../FileUploader";


const RegisterForm = ({user}: {user:User}) => {
  const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
  // 1. Define your form.
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues, 
      name: "",
      email: "",
      phone: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit({name, email, phone}: z.infer<typeof PatientFormValidation>) {
   setIsLoading(true);

   try {
    const userData  = {
      name,
      email,
      phone
    }

    const user = await createUser(userData)

    if(user) {
      router.push(`/patients/${user.$id}/register`)
    }
    
   } catch (error) {
    console.log(error)
    
   }
  
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
        <section className="space-y-4">
            <h1 className="header">Welcome</h1>
            <p className="text-dark-700">Let us know more about yourself.</p>
        </section>
        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">Personal Information.</h2>
            </div>
        </section>

        <CustomFormField
            fieldType = {FormFieldType.INPUT}
            control={form.control} 
            name = "name"
            label = "Name"
            placeholder = "John Doe"
            iconSrc = "/assets/icons/user.svg"
            iconAlt = "user"
        />

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                fieldType = {FormFieldType.INPUT}
                control={form.control} 
                name = "email"
                label = "Email"
                placeholder = "johndoe@gmail.com"
                iconSrc = "/assets/icons/email.svg"
                iconAlt = "email"
            />
            <CustomFormField
                fieldType = {FormFieldType.PHONE_INPUT}
                control={form.control} 
                name = "phone"
                label = "Phone Number"
                placeholder = "07777777777"
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                fieldType = {FormFieldType.DATE_PICKER}
                control={form.control} 
                name = "birthDate"
                label = "Date of Birth"
                placeholder = "johndoe@gmail.com"
                iconSrc = "/assets/icons/email.svg"
                iconAlt = "email"
            />
            <CustomFormField
                fieldType = {FormFieldType.SKELETON}
                control={form.control} 
                name = "gender"
                label = "Gender"
                renderSkeleton={(field) => (
                    <FormControl > 
                        <RadioGroup 
                            className="flex h-11 gap-6 xl:justify-between" 
                            onValueChange={field.onChange}
                            defaultValue={field.value}>
                                {GenderOptions.map((option)=> 
                                (
                                <div key={option} className="radio-group">
                                    <RadioGroupItem 
                                        value={option}
                                        id={option}/>
                                    <Label htmlFor={option}
                                        className="cursor-pointer"
                                    >
                                        {option}
                                    </Label>

                                </div>))}


                        </RadioGroup>

                    </FormControl>
                )}
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                fieldType = {FormFieldType.INPUT}
                control={form.control} 
                name = "address"
                label = "Address"
                placeholder = "14 California Way, Weybridge"
            />
            <CustomFormField
                fieldType = {FormFieldType.INPUT}
                control={form.control} 
                name = "occupation"
                label = "Occupation"
                placeholder = "Software Engineer"
            />
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                fieldType = {FormFieldType.INPUT}
                control={form.control} 
                name = "emergencyContactName"
                label = "Emergency Contact Name"
                placeholder = "Guardian's Name"
            />
            <CustomFormField
                fieldType = {FormFieldType.PHONE_INPUT}
                control={form.control} 
                name = "emergencyContactNumber"
                label = "Emergency Contact Number"
                placeholder = "07777777777"
            />
        </div>

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">Medical Information</h2>
            </div>
        </section>

        <CustomFormField
                fieldType = {FormFieldType.SELECT}
                control={form.control} 
                name = "primaryPhysician"
                label = "Primary Physician"
                placeholder = "Select a Physician"
        >
            {Doctors.map((doctor, i)=> (
                <SelectItem key={doctor.name+ i} value={doctor.name}>
                    <div className="flex cursor-pointer items-center gap-2">
                        <Image 
                            src={doctor.image}
                            width={32}
                            height={32}
                            alt={doctor.name}
                            className="rounded-full border border-dark-500" 
                        />

                        <p> {doctor.name}</p>
                    </div>

                </SelectItem>
            ) )}
        </CustomFormField>

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
                fieldType = {FormFieldType.INPUT}
                control={form.control} 
                name = "insuranceProvider"
                label = "Insurance Provider"
                placeholder = "Vitality"
            />
            <CustomFormField
                fieldType = {FormFieldType.INPUT}
                control={form.control} 
                name = "insurancePolicyNumber"
                label = "Insurance Policy Number"
                placeholder = "ABC123456789"
            />

        </div>
        
        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
                fieldType = {FormFieldType.TEXTAREA}
                control={form.control} 
                name = "allergies"
                label = "Allergies"
                placeholder = "Peanuts, Penicillin, Pollen"
            />
            <CustomFormField
                fieldType = {FormFieldType.INPUT}
                control={form.control} 
                name = "currentMedication"
                label = "Current Medication"
                placeholder = "Blue Inhaler, Ibupofen 200mg"
            />

        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
                fieldType = {FormFieldType.TEXTAREA}
                control={form.control} 
                name = "familyMedicalHistory"
                label = "Family Medical History"
                placeholder = "Mother had brain cancer, Father has heart disease"
            />
            <CustomFormField
                fieldType = {FormFieldType.INPUT}
                control={form.control} 
                name = "pastMedicalHistory"
                label = "Past Medical History"
                placeholder = "Appendectomory"
            />
        </div>

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">Identification and Verification</h2>
            </div>
        </section>

        <CustomFormField
                fieldType = {FormFieldType.SELECT}
                control={form.control} 
                name = "identificationType"
                label = "Identification Type"
                placeholder = "Select an identification type"
        >
            {IdentificationTypes.map((type)=> (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
            ) )}
        </CustomFormField>

        <CustomFormField
                fieldType = {FormFieldType.INPUT}
                control={form.control} 
                name = "identificationNumber"
                label = "Identification Number"
                placeholder = "1234567890"
            />

        <CustomFormField
                fieldType = {FormFieldType.SKELETON}
                control={form.control} 
                name = "identificationDocument"
                label = "Scanned copy of identification document"
                renderSkeleton={(field) => (
                    <FormControl>
                        <FileUploader files={field.value} onChange={field.onChange}  />
                    </FormControl>
                   
                )}
            />

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">Consent and Privacy</h2>
            </div>
        </section>

        <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="treatmentConsent"
            label="I consent to treatment" />
            
        <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="disclosureConsent"
            label="I consent to disclosure of information" />

        <CustomFormField
            fieldType={FormFieldType.CHECKBOX}
            control={form.control}
            name="privacyConsent"
            label="I consent to privacy policy" />
        


            
        <SubmitButton isLoading={isLoading}> Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
