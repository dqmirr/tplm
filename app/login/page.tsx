// import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login } from "./actions";

export default function Login () {
  return (
    <section className="flex h-screen w-full items-center justify-center px-4 py-32">
      <div className="container">
        <form>

        <div className="flex flex-col gap-4">
          <div className="mx-auto w-full max-w-sm rounded-md p-6 shadow">
            <div className="mb-6 flex flex-col items-center">
              <img
                src="https://shadcnblocks.com/images/block/block-1.svg"
                alt="logo"
                className="mb-7 h-10 w-auto"
              />
              <p className="mb-2 text-2xl font-bold">Login Admin</p>
              <p className="text-muted-foreground">
                Masuk sebagai admin
              </p>
            </div>
            <div>
              <div className="grid gap-4">
                <Input id="email" type="email" name="email" placeholder="Masukkan email" required />
                <div>
                  <Input
                  id="password" 
                  type="password"
                  name="password"
                    placeholder="Enter your password"
                    required
                  />
                  <p className="mt-1 text-sm text-muted-foreground">
                    Must be at least 8 characters.
                  </p>
                </div>
                <Button type="submit" formAction={login} className="mt-2 w-full font-white">
                  Masuk
                </Button>
                
              </div>
              <div className="mx-auto mt-8 flex justify-center gap-1 text-sm text-muted-foreground">
                <p>Already have an account?</p>
                <a href="#" className="font-medium text-primary">
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>
        </form>
      </div>
    </section>
  );
};