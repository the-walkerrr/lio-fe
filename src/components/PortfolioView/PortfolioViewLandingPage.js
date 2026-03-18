import {
  BriefcaseBusiness,
  Calendar,
  Globe,
  Languages,
  Mail,
  MapPin,
  MapPinHouse,
  Mars,
  Phone,
  User,
} from "lucide-react";
import Timeline from "./Timeline";
import LinkedInIcon from "@/icons/LinkedInIcon";
import GithubIcon from "@/icons/GithubIcon";

export default function PortfolioViewLandingPage() {
  return (
    <div className="flex px-10 gap-2 mt-8">
      <div className="flex gap-10 flex-1 min-w-0">
        {/* LHS */}
        <div className="flex flex-col shrink-0 flex-2/5">
          {/* Profile pic and name */}
          <div className="flex flex-col gap-2">
            <img
              src="/mock_images/mock_profile_picture.png"
              alt="mock_profile_picture"
              className="w-48 h-48"
            />
            <div className="flex flex-col gap-1">
              <div className="text-3xl font-bold">Divakar Mahanthi</div>
              <div className="text-sm">
                Passionate software engineer dedicated to building scalable web
                applications and solving complex problems with clean, efficient
                code.
              </div>
            </div>
          </div>
          {/* Info */}
          <div className="mt-6 flex flex-col gap-6">
            {/* Current role */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center font-medium text-sm gap-4">
                <BriefcaseBusiness size={18} />
                <span>Aakash Educational Services Limited</span>
              </div>
              <div className="flex items-center font-medium text-sm gap-4">
                <User size={18} />
                <span>Software Engineer</span>
              </div>
              <div className="flex items-center font-medium text-sm gap-4">
                <MapPin size={18} />
                <span>Hyderabad, Telangana</span>
              </div>
            </div>
            {/* contacts and links */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center font-medium text-sm gap-4">
                <Mail size={18} />
                <span>divakarnaidumahanthi@gmail.com</span>
              </div>
              <div className="flex items-center font-medium text-sm gap-4">
                <Phone size={18} />
                <span>+91 8333994242</span>
              </div>
              <div className="flex items-center font-medium text-sm gap-4">
                <LinkedInIcon size={18} />
                <span>linkedin.com/in/divakar-mahanthi</span>
              </div>
              <div className="flex items-center font-medium text-sm gap-4">
                <GithubIcon size={18} />
                <span>github.com/the-walkerrr</span>
              </div>
              <div className="flex items-center font-medium text-sm gap-4">
                <Globe size={18} />
                <span>divakar-mahanthi.framer.website</span>
              </div>
            </div>
            {/* personal info */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center font-medium text-sm gap-4">
                <Calendar size={18} />
                <span>May 8, 2002 | 22 yrs</span>
              </div>
              <div className="flex items-center font-medium text-sm gap-4">
                <MapPinHouse size={18} />
                <span>Visakhapatnam, Andhra Pradesh</span>
              </div>
              <div className="flex items-center font-medium text-sm gap-4">
                <Mars size={18} />
                <span>Male</span>
              </div>
              <div className="flex items-center font-medium text-sm gap-4">
                <Languages size={18} />
                <span>Hindi, English, Telugu</span>
              </div>
            </div>
          </div>
        </div>
        {/* RHS */}
        <div className="flex flex-col flex-3/5 min-w-0">
          {/* Section Tabs */}
          <div></div>
          {/* Timeline */}
          <Timeline />
        </div>
      </div>
    </div>
  );
}
