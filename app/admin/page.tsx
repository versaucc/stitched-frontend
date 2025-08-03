'use client';

import '../../styles/admin.css';
import VectorAnimation from '../../components/backgrounds/VectorAnimation';
import Link from 'next/link';
import { Card, CardContent } from '../../components/ui/card';
import InventorySummary from '../../components/admin/InventorySummary';
import AuthWrapper from '../../lib/authWrapper';
import Clock from '../../components/admin/Clock';

export default function ProductionHome() {
  return (
    <AuthWrapper>
      <div className="production-page">
        <VectorAnimation />
        <header className="production-header">
          <div className="header-left">
          </div>
          <h1>Dashboard</h1>
          <nav>
            <Link href="/admin/edit">Edit</Link>
            <Link href="/admin/view">View</Link>
            <Link href="/admin/data">Data</Link>
            <Link href="/admin/data/sales">Sales Data</Link>
            <Link href="/admin/data/customers">Customer Data</Link>
            <Link href="/admin/data/website">Website Data</Link>
          </nav>
          <Clock />
        </header>

        <div className="production-grid">
          <Card className="production-card">
            <CardContent>
              <h2 className="text-center">Recent</h2>
              <ul>
                <li>07/18/2025 - Something something different got done</li>
                <li>07/15/2025 - Something something else got done</li>
                <li>07/10/2025 - Something something got done</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="production-card">
            <CardContent>
              <h2 className="text-center">Production Stats</h2>
              <p>Weekly: 32 pairs completed</p>
              <p>Biweekly Goal: 75 pairs</p>
              <p>Monthly Output: 123 pairs</p>
            </CardContent>
          </Card>
          <Card className="production-card">
            <CardContent>
              <InventorySummary
                tableName="Inventory - Jeans"
                rowNames={['Light Wash', 'Medium Wash', 'Dark Wash', 'Two-Tone']}
                columnNames={['26', '28', '30', '32', '34', '36', '38']}
                cellContent={[
                  [10, 20, 30, 40, 50, 60, 70],
                  [15, 25, 35, 45, 55, 65, 75],
                  [5, 10, 15, 20, 25, 30, 35],
                  [20, 30, 40, 50, 60, 70, 80],
                ]}
              />
            </CardContent>
          </Card>
          <Card className="production-card">
            <CardContent>
              <InventorySummary
                tableName="Production - Jeans"
                rowNames={[
                  'Tagged',
                  'Seam-Ripped',
                  'Matched Panels',
                  'Sewn/Surged',
                  'Patch',
                  'Finished',
                ]}
                columnNames={['26', '28', '30', '32', '34', '36', '38']}
                cellContent={[
                  [1, 4, 13, 4, 8, 3, 7],
                  [1, 5, 3, 12, 25, 5, 7],
                  [5, 1, 1, 1, 5, 3, 5],
                  [1, 3, 4, 5, 6, 7, 8],
                  [1, 3, 4, 5, 6, 7, 8],
                  [1, 3, 4, 5, 6, 7, 8],
                ]}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthWrapper>
  );
}