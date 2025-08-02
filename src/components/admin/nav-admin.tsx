import Link from 'next/link'
import React from 'react'

export default function AdminNavigation() {
  return (
    <div className="flex gap-4 mb-6">
    <Link
      href="/admin"
      className="bg-purple-600 hover:bg-purple-500 py-2 px-2 rounded text-white"
    >
      Controls {/* {t("controls")} */}
    </Link>
    <Link
      href="/admin/create"
      className="bg-green-600 hover:bg-green-500 py-2 px-2 rounded text-white"
    >
      Create {/* {t("create")} */}
    </Link>
    <Link
      href="/admin/events"
      className="bg-orange-600 hover:bg-orange-500 py-2 px-2 rounded text-white"
    >
      Events
    </Link>
    <Link
      href="/admin/events"
      className="bg-blue-600 hover:bg-blue-500 py-2 px-2 rounded text-white"
    >
      Dashboard
    </Link>
  </div>
  )
}
