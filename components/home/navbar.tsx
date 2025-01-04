import { Fish, Menu, X } from "lucide-react";

import { useState } from "react";
import { Button } from "../ui/button";
import { supabase } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function NavBar () {
const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

// const session = await supabase.auth.getSession()
const router = useRouter()
    return(
        <nav className="bg-white shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Fish className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold">Pasar Ikan Desa Beji</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
              <a href="#sellers" className="text-gray-700 hover:text-blue-600">Sellers</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Services</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Contact</a>
              {/* {session===null ? <Button onClick={()=>router.push('login')}>Login</Button> : <p>Admin</p>} */}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
              // onClick={() => setIsMenuOpen(!isMenuOpen)}
                // {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              >
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4">
              <div className="flex flex-col space-y-4">
                <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
                <a href="#" className="text-gray-700 hover:text-blue-600">Sellers</a>
                <a href="#" className="text-gray-700 hover:text-blue-600">Services</a>
                <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
                <a href="#" className="text-gray-700 hover:text-blue-600">Contact</a>
              </div>
            </div>
          )}
        </div>
      </nav>
    )
}
