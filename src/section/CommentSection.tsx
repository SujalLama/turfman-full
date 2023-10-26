import CommentForm from "@/forms/CommentForm";

export default function CommentSection() {
  return (
    <section className="mb-10 md:mb-0">
        <h2 className="text-xl mb-2 text-gray-darker font-bold">Leave a Reply</h2>
        <p className="mb-8">Your email address will not be published. Required fields are marked *</p>

        <CommentForm />
    </section>
  )
}
