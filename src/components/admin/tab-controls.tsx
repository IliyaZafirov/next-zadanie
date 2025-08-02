import GlassLink from "../ui/link-glass";

export default function ControlsTab() {
  return (
    <div className="bg-gray-900 p-4 relative">
    <table className="w-full text-white">
      <thead>
        <tr className="border-b border-gray-600">
          <th className="p-2 text-left">ID</th>
          <th className="p-2 text-left">Име</th>
          <th className="p-2 text-left">Секция</th>
          <th className="p-2 text-left">Регион</th>
          <th className="p-2 text-left">Действия</th>
        </tr>
      </thead>
      <tbody>
        {controls.map((c) => (
          <tr key={c.control_id} className="border-b border-gray-700">
            <td className="p-2">{c.control_id}</td>
            <td className="p-2">{c.control_name}</td>
            <td className="p-2">{c.section_name}</td>
            <td className="p-2">{c.region_name}</td>
            <td className="p-2">
              <GlassLink
                href={`/admin/controls/${c.control_id}`}
                className="bg-gray-800/30 px-4 py-2 text-sm"
              >
                Промени
              </GlassLink>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}
