'use client';

import '../../styles/admin.css';
import VectorAnimation from '../../components/backgrounds/VectorAnimation';
import Link from 'next/link';
import { Card, CardContent } from '../../components/ui/card';
import InventorySummary from '../../components/admin/InventorySummary';
import AuthWrapper from '../../lib/authWrapper';
import Clock from '../../components/admin/Clock';
import SiteViewers from '../../components/admin/SiteViewers'; // Import SiteViewers component
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase'; // Import Supabase client

export default function ProductionHome() {
  const [productionData, setProductionData] = useState<number[][]>(
    Array(6).fill(null).map(() => Array(7).fill(0)) // Initialize with empty table structure
  );

  const [finishedData, setFinishedData] = useState<number[][]>(
    Array(5).fill(null).map(() => Array(7).fill(0)) // Initialize with empty table structure
  );

  useEffect(() => {
    const fetchProductionData = async () => {
      try {
        const { data, error } = await supabase
          .from('production')
          .select('waist, seam_ripped, has_panels, sewn, patch, done, embroideries');

        if (error) {
          console.error('Error fetching production data:', error.message);
          return;
        }

        // Initialize the table structure
        const waistSizes = ['26', '28', '30', '32', '34', '36', '38'];
        const statusFields = ['seam_ripped', 'has_panels', 'sewn', 'patch', 'done', 'embroideries'];
        const tableData = Array(statusFields.length).fill(null).map(() => Array(waistSizes.length).fill(0));

        // Process the data
        data?.forEach((item) => {
          if (!item.waist) return; // Skip if waist is null or undefined
          const waistIndex = waistSizes.indexOf(item.waist.toString());
          if (waistIndex === -1) return; // Skip if waist size is not in the table

          statusFields.forEach((field, fieldIndex) => {
            if (field === 'embroideries') {
              if (item[field] && item[field].trim() !== '') {
                tableData[fieldIndex][waistIndex]++;
              }
            } else if (item[field]) {
              tableData[fieldIndex][waistIndex]++;
            }
          });
        });

        setProductionData(tableData);
      } catch (err) {
        console.error('Unexpected error fetching production data:', err);
      }
    };

  const fetchFinishedData = async () => {
    try {
      const { data, error } = await supabase
        .from('production')
        .select('waist, wash, done');

      if (error) {
        console.error('Error fetching finished data:', error.message);
        return;
      }

      // Initialize the table structure
      const waistSizes = ['26', '28', '30', '32', '34', '36', '38'];
      const washCategories = ['light', 'medium', 'dark', 'solid', 'two_tone'];
      const tableData = Array(washCategories.length).fill(null).map(() => Array(waistSizes.length).fill(0));

      // Process the data
      data?.forEach((item) => {
        if (!item.waist || !item.wash || !item.done) return; // Skip if waist, wash, or done is null/undefined or done is false
        const waistIndex = waistSizes.indexOf(item.waist.toString());
        if (waistIndex === -1) return; // Skip if waist size is not in the table

        const wash = item.wash.toLowerCase();

        if (wash === 'light') {
          tableData[0][waistIndex]++;
        } else if (wash === 'medium') {
          tableData[1][waistIndex]++;
        } else if (wash === 'dark') {
          tableData[2][waistIndex]++;
        } else if (wash.includes('/')) {
          tableData[4][waistIndex]++; // Two-tone
        } else {
          tableData[3][waistIndex]++; // Solid color
        }
      });

      setFinishedData(tableData);
    } catch (err) {
      console.error('Unexpected error fetching finished data:', err);
    }
  };

    fetchProductionData();
    fetchFinishedData();
  }, []);

  return (
    <AuthWrapper>
      <div className="production-page">
        <VectorAnimation />
        <header className="production-header">
          <h1>Dashboard</h1>
          <div className="header-row">
            <nav>
              <Link href="/admin/inventory">Inventory</Link>
              <Link href="/admin/data">Data</Link>
              <Link href="/admin/calendar">Calendar</Link>
              <Link href="/admin/data/finances">Finances</Link>
            </nav>
            <Clock />
          </div>
        </header>

        <div className="production-grid">

          {/* Other cards */}
          <Card className="production-card">
            <CardContent>
              <h2 className="text-center">Recent</h2>
              <ul>
                <li>8/7/2025 - Need to get cardstock ordered</li>
                <li>8/7/2025 - Sam get AI files in </li>
                <li>8/7/2025 - Get files from Garrett</li>
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
                tableName="Pants finished by waist and wash"
                rowNames={['Light Wash', 'Medium Wash', 'Dark Wash', 'Solid Colors', 'Two-Tone']}
                columnNames={['26', '28', '30', '32', '34', '36', '38']}
                cellContent={finishedData}
              />
            </CardContent>
          </Card>

          <Card className="production-card">
            <CardContent>
              <InventorySummary
                tableName="Pants in production by status and waist"
                rowNames={[
                  'Seam-Ripped',
                  'Matched Panels',
                  'Sewn/Surged',
                  'Patch',
                  'Finished',
                  'Embroidered',
                ]}
                columnNames={['26', '28', '30', '32', '34', '36', '38']}
                cellContent={productionData}
              />
            </CardContent>
          </Card>

          {/* New Cards */}
          <Card className="production-card">
            <CardContent>
              <h2 className="text-center">Costs</h2>
            </CardContent>
          </Card>

          <Card className="production-card">
            <CardContent>
              <h2 className="text-center">Sales</h2>
            </CardContent>
          </Card>

          <Card className="production-card">
            <CardContent>
              <h2 className="text-center">Margins</h2>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthWrapper>
  );
}