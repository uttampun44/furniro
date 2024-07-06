import { useContext, useEffect, useState } from "react";
import Sidebaruser from "../components/Sidebar";
import TopNavigation from "../components/TopNavigation";
import axios from "axios";
import { Context } from "../../context/ContextProvider";


type profileDetail = {
    date_of_birth: string;
    phone_details: string;
    image: string | null;
    gender: string;
    user_id: number;
    user: {
      name: string;
      email: string;
      created_at: string;
      updated_at: string;
    };
  };

  const link =[
    {
        name: 'Dashboard', path: "/user"
    },
    {
        name: 'Profile', path: "/profile"
    },
    {
        name: 'Update Profile', path: "/update-profile"
    },
    {
        name: 'Orders', path: "/orders"
    }
    
  ]

const Profile: React.FC = () => {
  const context = useContext(Context);

  const [profile, SetProfile] = useState<profileDetail | null>(null);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = context?.token;
        const resopnse = await axios.get("/api/profile", {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (resopnse.status === 200) {
        
          SetProfile(resopnse.data.user_profile[0]);
        }
      } catch (error) {}
    };
    fetchUser();
  }, [context]);

  if (!profile) {
    return <div>Loading...</div>; 
  }

  const { user, date_of_birth, gender, phone_details } = profile;

  return (
    <>
      <Sidebaruser sidebarLink={link}/>
      <TopNavigation />
     <div>
        
                <div className="bg-white max-w-2xl mx-auto my-8 shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    User Profile
                  </h3>
                 
                </div>
                <div className="border-t border-gray-200">
                  <dl>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Full name</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {user.name}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                       {user.email}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Date Of Birth
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {date_of_birth ? new Date(date_of_birth).toLocaleDateString() : 'N/A'}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Gender</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {gender}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Addres One</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        To get social media testimonials like these, keep your customers
                        engaged with your social media accounts by posting regularly
                        yourself
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Addres Two</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        To get social media testimonials like these, keep your customers
                        engaged with your social media accounts by posting regularly
                        yourself
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">City</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        To get social media testimonials like these, keep your customers
                        engaged with your social media accounts by posting regularly
                        yourself
                      </dd>
                    </div>
        
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Postal Code</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        To get social media testimonials like these, keep your customers
                        engaged with your social media accounts by posting regularly
                        yourself
                      </dd>
                    </div>
        
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Country</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        To get social media testimonials like these, keep your customers
                        engaged with your social media accounts by posting regularly
                        yourself
                      </dd>
                    </div>
        
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Telephone</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        To get social media testimonials like these, keep your customers
                        engaged with your social media accounts by posting regularly
                        yourself
                      </dd>
                    </div>
        
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Mobile No One
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {phone_details}
                      </dd>
                    </div>
        
                    <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Mobile No Two
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        To get social media testimonials like these, keep your customers
                        engaged with your social media accounts by posting regularly
                        yourself
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
       
     </div>
    </>
  );
};
export default Profile;
