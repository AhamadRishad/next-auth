import Link from "next/link";

export default function Dashbord() {
  return (
    <div>
      <div className="flex col gap-8">
        <div>
            <Link href={'/admin/addproducts'}>
          <button>Add Products</button>
          </Link>
        </div>
        <div>
          <button>View Products</button>
        </div>
     </div>
    </div>
  );
}
