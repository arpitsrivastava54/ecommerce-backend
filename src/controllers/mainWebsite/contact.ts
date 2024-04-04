import { Request, Response } from "express";
import { tryCatchWrapper } from "../../utils/services";
import Contact from "../../models/contact";
import { ApiResponse } from "../../utils/ApiResponse";

type ContactType = {
 firstName: string;
 lastName: string;
 email: string;
 phone: string;
 message: string;
};

export const fetchContactData = tryCatchWrapper(
  async(req,res) =>{
    const data = await Contact.find();
    if(!data) throw new Error("Something went wrong while fetching Contact Data")
    res.status(200).json(new ApiResponse("Contact data fetch Successfully",data))
  }
)

export const insertContactData = tryCatchWrapper(
 async (req: Request<{}, {}, ContactType>, res: Response) => {
  const { email, firstName, lastName, message, phone } = req.body;
  if (!email || !firstName || !lastName || !message || !phone)
   throw new Error("All fields are required");

  const contact = await Contact.create({
   email,
   firstName,
   lastName,
   message,
   phone,
  });

  if (!contact)
   throw new Error("Something went wrong while inserting contact data");

  await contact.save();

  res
   .status(200)
   .json(new ApiResponse("Contact Data insert successfully", contact));
 }
);
