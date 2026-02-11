import { useEffect, useState } from "react"
import { supabase } from "../supabase-client"
import { useParams } from "react-router-dom"

function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  const [user, setUser] = useState(null) // current logged-in user
  const [isAdmin, setIsAdmin] = useState(false)

  // For editing / adding new product
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [imageFile, setImageFile] = useState(null)

  // Fetch logged-in user
  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser()
    setUser(data.user)
    if (data.user?.email === "admin@gmail.com") {
      setIsAdmin(true)
    }
  }

  // Fetch product by ID
  const fetchProduct = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single()

    if (error) {
      alert(error.message)
    } else {
      setProduct(data)
      setName(data.name)
      setDescription(data.description || "")
      setPrice(data.price)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchUser()
    if (id) fetchProduct()
  }, [id])

  // Upload image to Supabase Storage
  const uploadImage = async () => {
    if (!imageFile) return product?.image_url || null

    const fileName = `${Date.now()}_${imageFile.name}`
    const { data, error } = await supabase.storage
      .from("product-images") // make sure bucket exists
      .upload(fileName, imageFile, { upsert: true })

    if (error) {
      alert(error.message)
      return null
    }

    const { publicUrl } = supabase.storage
      .from("product-images")
      .getPublicUrl(fileName)

    return publicUrl
  }

  // Save product (edit or add)
  const saveProduct = async () => {
    if (!isAdmin) {
      alert("Only admins can save products")
      return
    }

    const imageUrl = await uploadImage()

    if (id) {
      // Update product
      const { error } = await supabase
        .from("products")
        .update({
          name,
          description,
          price: parseFloat(price),
          image_url: imageUrl,
        })
        .eq("id", id)

      if (error) alert(error.message)
      else alert("Product updated successfully")
    } else {
      // Add new product
      const { error } = await supabase
        .from("products")
        .insert([{ name, description, price: parseFloat(price), image_url: imageUrl }])

      if (error) alert(error.message)
      else alert("Product added successfully")
    }
  }

  if (loading) return <p className="text-white">Loading...</p>

  return (
    <div className="bg-zinc-900 text-white min-h-screen px-10 py-16">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="bg-zinc-800 h-96 flex items-center justify-center text-gray-400">
          {product?.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="h-full object-contain"
            />
          ) : (
            "Product Image"
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product?.name}</h1>
          <p className="text-gray-400 mb-6">{product?.description}</p>
          <p className="text-2xl font-bold mb-6">₱{product?.price}</p>

          {/* Edit / Add form for admins */}
          {isAdmin && (
            <div className="space-y-2 mb-6">
              <input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 text-black w-full"
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="p-2 text-black w-full"
              />
              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="p-2 text-black w-full"
              />
              <input
                type="file"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="text-white"
              />
              <button
                onClick={saveProduct}
                className="bg-red-600 px-6 py-3 uppercase tracking-wider"
              >
                {product ? "Update Product" : "Add Product"}
              </button>
            </div>
          )}

          {/* Add to Cart Button for normal users */}
          {!isAdmin && (
            <button className="bg-red-600 px-6 py-3 uppercase tracking-wider">
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
