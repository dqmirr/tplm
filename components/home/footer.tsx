export default function Footer (){
    return (
        <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">About Us</h3>
              <ul className="space-y-2">
                <li>Mission</li>
                <li>History</li>
                <li>Team</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>Guidelines</li>
                <li>Documentation</li>
                <li>Support</li>
                <li>FAQs</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li>Phone: (555) 123-4567</li>
                <li>Email: info@fishmarket.gov</li>
                <li>Address: 123 Harbor St</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Accessibility</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            © 2024 Government Fish Market. All rights reserved.
          </div>
        </div>
      </footer>
    )
}