import { Input } from "./ui/input";
import { putImages } from "../lib/product";

function ImageInput({ onChange, value }) {
  const handleFileChange = async (e) => {
    try {
      if (!e.target.files || e.target.files.length === 0) {
        return;
      }
      const files = e.target.files;
      const publicUrl = await putImages({ files }); //! File will be uploaded to a bucket and the url will be returned

      onChange(publicUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Input type="file" onChange={handleFileChange} multiple />
    </div>
  );
}

export default ImageInput;
