import { useEffect, useState } from "react"
import { supabase } from "../supabase-client"

function AdminDashboard() {
  const [products, setProducts] = useState([])
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [imageFile, setImageFile] = useState(null)
  const [editingProductId, setEditingProductId] = useState(null)

  // 1 Fetch products
  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*")
    if (error) alert(error.message)
    else setProducts(data)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  // 2️ Upload image to Supabase Storage
  const uploadImage = async () => {
    if (!imageFile) return null

    const fileName = `${Date.now()}_${imageFile.name}`
    const { data, error } = await supabase.storage
      .from("product-images") // Make sure this bucket exists
      .upload(fileName, imageFile)

    if (error) {
      alert(error.message)
      return null
    }

    // Get public URL
    const { publicUrl } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName)

    return publicUrl
  }

  // 3️ Add or update product
  const saveProduct = async () => {
    if (!name || !price) {
      alert("Please enter name and price")
      return
    }

    let imageUrl = null
    if (imageFile) {
      imageUrl = await uploadImage()
    }

    if (editingProductId) {
      // Update
      const { error } = await supabase
        .from("products")
        .update({ name, price: parseFloat(price), image_url: imageUrl })
        .eq("id", editingProductId)

      if (error) alert(error.message)
      else {
        fetchProducts()
        setName("")
        setPrice("")
        setImageFile(null)
        setEditingProductId(null)
      }
    } else {
      // Insert new
      const { error } = await supabase
        .from("products")
        .insert([{ name, price: parseFloat(price), image_url: imageUrl }])

      if (error) alert(error.message)
      else {
        fetchProducts()
        setName("")
        setPrice("")
        setImageFile(null)
      }
    }
  }

  // 4️ Delete product
  const deleteProduct = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this product?")
    if (!confirm) return

    const { error } = await supabase.from("products").delete().eq("id", id)
    if (error) alert(error.message)
    else fetchProducts()
  }

  // 5️ Start editing
  const editProduct = (product) => {
    setEditingProductId(product.id)
    setName(product.name)
    setPrice(product.price)
    setImageFile(null)
  }

  return (
    <div className="bg-zinc-900 text-white min-h-screen px-10 py-16">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Product Form */}
      <div className="bg-zinc-800 p-6 rounded mb-6">
        <h2 className="font-bold mb-2">Product Management</h2>
        <p className="text-gray-400 mb-4">Add, update, or remove products from the store.</p>

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-2 mb-2 text-black w-full"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-2 mb-2 text-black w-full"
        />

        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="mb-2 text-white"
        />

        <button
          className="bg-red-600 px-6 py-3 uppercase tracking-wider mb-4"
          onClick={saveProduct}
        >
          {editingProductId ? "Update Product" : "Add New Product"}
        </button>
      </div>

      {/* Product List */}
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="bg-zinc-800 p-4 rounded flex justify-between items-center">
            <div>
              <h3 className="font-bold">{product.name}</h3>
              <p className="text-gray-400">${product.price}</p>
              {product.image_url && (
                <img src={product.image_url} alt={product.name} className="w-32 mt-2 rounded" />
              )}
            </div>
            <div className="space-x-2">
              <button
                className="bg-yellow-500 px-3 py-1 rounded"
                onClick={() => editProduct(product)}
              >
                Edit
              </button>
              <button
                className="bg-red-600 px-3 py-1 rounded"
                onClick={() => deleteProduct(product.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard
