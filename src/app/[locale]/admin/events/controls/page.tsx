import ControlsEventsList from "@/components/admin/controls-events-list";

export default async function Page() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin/controls`,
      {
        credentials: "include",
      }
    );
    const data = await res.json();
    if (!data.success) {
      throw new Error("Something went wrong.");
    }

    console.log(data);
  } catch (err) {
    console.log(err);
  }

  return (
    <>
      <div></div>
      <div>
        <ControlsEventsList />
      </div>
    </>
  );
}
