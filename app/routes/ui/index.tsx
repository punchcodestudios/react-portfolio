import { Link, type ActionFunctionArgs } from "react-router";
import { Button } from "~/components/ui/button";
export async function action({ request, params }: ActionFunctionArgs) {}
export default function Index() {
  return (
    <>
      <h1>UI Library</h1>
      <div className="flex flex-col">
        <div className="flex flex-row flex-wrap">
          <div className="p-5 w-[25%]">
            <Link to="/resume" className="">
              <Button variant="default">Default</Button>
            </Link>
          </div>
          <div className="p-5 w-[25%]">
            <Link to="/resume" className="">
              <Button variant="primary">Primary</Button>
            </Link>
          </div>
          <div className="p-5 w-[25%]">
            <Link to="/resume" className="">
              <Button variant="secondary">Secondary</Button>
            </Link>
          </div>
          <div className="p-5 w-[25%]">
            <Link to="/resume" className="">
              <Button variant="error">Error</Button>
            </Link>
          </div>
          <div className="p-5 w-[25%]">
            <Link to="/resume" className="">
              <Button variant="warning">Warning</Button>
            </Link>
          </div>
          <div className="p-5 w-[25%]">
            <Link to="/resume" className="">
              <Button variant="success">Success</Button>
            </Link>
          </div>
          <div className="p-5 w-[25%]">
            <Link to="/resume" className="">
              <Button variant="information">Information</Button>
            </Link>
          </div>
          <div className="p-5 w-[25%]">
            <Link to="/resume" className="">
              <Button variant="disabled">Disabled</Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-row justify-between flex-wrap">
          <div className="p-5 w-[25%]">
            <Link to="/resume" className="">
              <Button variant="default" styleType="outline">
                Default
              </Button>
            </Link>
          </div>
          <div className="p-5 w-[25%]">
            <Link to="/resume" className="">
              <Button variant="primary" styleType="outline">
                Primary
              </Button>
            </Link>
          </div>
          <div className="p-5 w-[25%]">
            <Link to="/resume" className="">
              <Button variant="secondary" styleType="outline">
                Secondary
              </Button>
            </Link>
          </div>
          <div className="p-5 w-[25%]">
            <Link to="/resume" className="">
              <Button variant="error" styleType="outline">
                Error
              </Button>
            </Link>
          </div>
          <div className="p-5 w-[25%]">
            <Link to="/resume" className="">
              <Button variant="warning" styleType="outline">
                Warning
              </Button>
            </Link>
          </div>
          <div className="p-5 w-[25%]">
            <Link to="/resume" className="">
              <Button variant="success" styleType="outline">
                Success
              </Button>
            </Link>
          </div>
          <div className="p-5 w-[25%]">
            <Link to="/resume" className="">
              <Button variant="information" styleType="outline">
                Information
              </Button>
            </Link>
          </div>
          <div className="p-5 w-[25%]">
            <Link to="/resume" className="">
              <Button variant="disabled" styleType="outline">
                Disabled
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-row justify-between flex-wrap">
          <div className="p-5 w-[25%]">
            <Link to="/resume" className="">
              <Button size="sm">Small</Button>
            </Link>
          </div>
          <div className="p-5 w-[25%]">
            <Link to="/resume" className="">
              <Button size="md">Medium</Button>
            </Link>
          </div>
          <div className="p-5 w-[25%]">
            <Link to="/resume" className="">
              <Button size="lg">Large</Button>
            </Link>
          </div>
          <div className="p-5 w-[25%]">
            <Link to="/resume" className="">
              <Button size="wide">Wide</Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-row justify-between flex-wrap">
          <div className="p-5 w-[25%]">
            <Link to="/resume" className="">
              <Button rounded="sm">small</Button>
            </Link>
          </div>
          <div className="p-5 w-[25%]">
            <Link to="/resume" className="">
              <Button rounded="md">medium</Button>
            </Link>
          </div>
          <div className="p-5 w-[25%]">
            <Link to="/resume" className="">
              <Button rounded="lg">large</Button>
            </Link>
          </div>
          <div className="p-5 w-[25%]">
            <Link to="/resume" className="">
              <Button rounded="xl">xlarge</Button>
            </Link>
          </div>
          <div className="p-5 w-[25%]">
            <Link to="/resume" className="">
              <Button rounded="xxl">XXLarge</Button>
            </Link>
          </div>
          <div className="p-5 w-[25%]">
            <Link to="/resume" className="">
              <Button rounded="xxxl">XXXLarge</Button>
            </Link>
          </div>
        </div>
      </div>
      <Button variant="default">Default</Button>
    </>
  );
}
