import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from '@radix-ui/react-dropdown-menu';
import { Button } from './ui/button';
import axios from 'axios';

interface UserCardProps {
  username: string;
  lastName: string;
  userImage: string;
}

export function UserCard({ username, lastName, userImage }: UserCardProps) {

  const handleDelete = () => {
    try {
      const response = axios.delete('https://assignmentprojectbackend-1.onrender.com/api/userData/deleteUserData', { withCredentials: true });

      if(response){
        console.log("response", response);
      }
    } catch (error) {
      console.error('Error deleting userData:', error);
    }
  };  

  const handleEdit = () => {
    console.log("edit");
  };

  return (
    <Card className="relative w-full max-w-sm overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105">
      
      {/* Three Dots Dropdown Menu at the Top-Right Corner */}
      <div className="absolute top-2 right-2 bg-white  p-2 shadow-md hover:bg-gray-100 cursor-pointer" >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="p-1">
              <MoreVertical className="text-gray-700 text-3xl" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-48 rounded-lg bg-white shadow-lg p-2 animate-fadeIn">
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup>
              <DropdownMenuRadioItem value="edit" onClick={handleEdit}>
                Edit Details
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="delete" onClick={handleDelete}>
                Delete
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Card Content */}
      <CardContent className="p-6 mt-6">
        {/* User Image with Hover Effect */}
        <div className="relative w-24 h-24 mx-auto rounded-full overflow-hidden transform transition-transform duration-300 hover:scale-110 hover:shadow-lg">
          <Image
            src={userImage}
            alt={`${username} ${lastName}`}
            fill
            className="object-cover"
          />
        </div>

        {/* Username and Lastname */}
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200">
            {username}
          </h2>
          <p className="text-gray-500 mt-1 text-lg">
            {lastName}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
