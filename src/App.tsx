import Dashboard from "./components/component/dashboard";
import { Button } from "./components/ui/button";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from './components/ui/card'

export function App() {

  return (
    <div className="container mx-auto p-4">
    <Card className="my-4 border-2 border-gray-300">
      <CardHeader className="bg-gray-100">
        <CardTitle className="text-xl">Card Title</CardTitle>
        <CardDescription className="text-gray-500">This is a description for the card.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the content of the card. You can place any content here, including text, images, or other components.</p>
      </CardContent>
      <CardFooter className="bg-gray-100">
        <button className="btn btn-primary">Action</button>
      </CardFooter>
    </Card>
    <Button variant="default" size="default">
        Default Button
      </Button>
      <Button variant="destructive" size="lg">
        Destructive Button
      </Button>
      <Button variant="outline" size="sm">
        Outline Button
      </Button>
      <Button variant="link">
        Link Button
      </Button>
  </div>
  )
}


