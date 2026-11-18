import os
import matplotlib.pyplot as plt
import matplotlib.patches as patches

# Directories
OUT_IMG_DIR = r"D:\TUGAS\SIM SMT5\docs\diagram_images"
OUT_DRAWIO_DOCS = r"D:\TUGAS\SIM SMT5\docs\diagrams_drawio"
OUT_DRAWIO_PUB = r"D:\TUGAS\SIM SMT5\public\diagrams_drawio"

os.makedirs(OUT_IMG_DIR, exist_ok=True)
os.makedirs(OUT_DRAWIO_DOCS, exist_ok=True)
os.makedirs(OUT_DRAWIO_PUB, exist_ok=True)

# Helper to save drawio xml
def save_drawio(filename, xml_content):
    p1 = os.path.join(OUT_DRAWIO_DOCS, filename)
    p2 = os.path.join(OUT_DRAWIO_PUB, filename)
    with open(p1, "w", encoding="utf-8") as f:
        f.write(xml_content.strip())
    with open(p2, "w", encoding="utf-8") as f:
        f.write(xml_content.strip())
    print(f"Saved Draw.io file: {p1}")

# Draw.io Classic Style Helper for Matplotlib
def setup_drawio_canvas(ax, xlim=(0, 10), ylim=(0, 10)):
    ax.set_xlim(xlim[0], xlim[1])
    ax.set_ylim(ylim[0], ylim[1])
    ax.axis('off')
    # Subtle Draw.io grid background
    ax.set_facecolor("#FFFFFF")
    # Draw Draw.io badge in top right
    ax.text(xlim[1] - 0.2, ylim[1] - 0.25, "draw.io", ha="right", va="top", fontsize=9, fontweight="bold", color="#808080",
            bbox=dict(boxstyle="round,pad=0.25", fc="#F5F5F5", ec="#D0D0D0", lw=0.8))

# ================= 1. FLOWCHART BERJALAN =================
def build_flowchart_berjalan():
    # XML Draw.io
    xml = """<mxfile host="app.diagrams.net" modified="2026-11-18T01:30:00.000Z" agent="Draw.io" version="24.7.5">
  <diagram id="flow_berjalan" name="Flowchart Berjalan">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        
        <!-- Swimlane Karyawan -->
        <mxCell id="pool_karyawan" value="ENTITAS KARYAWAN" style="swimlane;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1b365d;fontStyle=1;fontSize=13;" vertex="1" parent="1">
          <mxGeometry x="40" y="40" width="340" height="720" as="geometry"/>
        </mxCell>
        <mxCell id="k1" value="Mulai: Tiba di Kampus UNPAM Viktor 2" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontColor=#274e13;fontSize=11;" vertex="1" parent="pool_karyawan">
          <mxGeometry x="50" y="50" width="240" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="k2" value="Tanda Tangan Manual Buku Absensi&#xa;(Tanpa Verifikasi GPS / Rawan Titip Absen)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=11;" vertex="1" parent="pool_karyawan">
          <mxGeometry x="40" y="140" width="260" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="k3" value="Mengisi Formulir Kertas Cuti atau&#xa;Kirim Pesan WhatsApp Pribadi" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=11;" vertex="1" parent="pool_karyawan">
          <mxGeometry x="40" y="250" width="260" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="k4" value="Menerima Putusan Cuti&#xa;(Menunggu 3 hingga 5 Hari)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontColor=#274e13;fontSize=11;" vertex="1" parent="pool_karyawan">
          <mxGeometry x="40" y="490" width="260" height="50" as="geometry"/>
        </mxCell>

        <!-- Swimlane Admin HR -->
        <mxCell id="pool_admin" value="ENTITAS ADMIN HR" style="swimlane;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontColor=#274e13;fontStyle=1;fontSize=13;" vertex="1" parent="1">
          <mxGeometry x="420" y="40" width="340" height="720" as="geometry"/>
        </mxCell>
        <mxCell id="a1" value="Menerima Berkas Kertas Cuti /&#xa;Pesan WhatsApp dari Karyawan" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=11;" vertex="1" parent="pool_admin">
          <mxGeometry x="40" y="250" width="260" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="a2" value="Memeriksa Sisa Kuota Cuti di&#xa;Buku Catatan Arsip Manual" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=11;" vertex="1" parent="pool_admin">
          <mxGeometry x="40" y="360" width="260" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="a3" value="Pengajuan&#xa;Disetujui?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;fontSize=11;fontStyle=1;" vertex="1" parent="pool_admin">
          <mxGeometry x="110" y="460" width="120" height="80" as="geometry"/>
        </mxCell>
        <mxCell id="a4" value="Akhir Bulan: Salin Manual Data Presensi&#xa;ke Microsoft Excel (Menyita 3-5 Hari)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f5f5f5;strokeColor=#666666;fontColor=#333333;fontSize=11;" vertex="1" parent="pool_admin">
          <mxGeometry x="40" y="610" width="260" height="60" as="geometry"/>
        </mxCell>

        <!-- Edges -->
        <mxCell id="e1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;entryX=0.5;entryY=0;strokeWidth=1.5;strokeColor=#333333;" edge="1" parent="1" source="k1" target="k2"/>
        <mxCell id="e2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;entryX=0.5;entryY=0;strokeWidth=1.5;strokeColor=#333333;" edge="1" parent="1" source="k2" target="k3"/>
        <mxCell id="e3" value="Kirim Berkas" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;entryX=0;entryY=0.5;strokeWidth=1.5;strokeColor=#333333;" edge="1" parent="1" source="k3" target="a1"/>
        <mxCell id="e4" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;entryX=0.5;entryY=0;strokeWidth=1.5;strokeColor=#333333;" edge="1" parent="1" source="a1" target="a2"/>
        <mxCell id="e5" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;entryX=0.5;entryY=0;strokeWidth=1.5;strokeColor=#333333;" edge="1" parent="1" source="a2" target="a3"/>
        <mxCell id="e6" value="Ya / Tolak" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;entryX=1;entryY=0.5;strokeWidth=1.5;strokeColor=#333333;" edge="1" parent="1" source="a3" target="k4"/>
        <mxCell id="e7" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;entryX=0.5;entryY=0;strokeWidth=1.5;strokeColor=#333333;" edge="1" parent="1" source="a3" target="a4"/>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>"""
    save_drawio("flowchart_berjalan.drawio", xml)

    # Render PNG with Draw.io Authentic Theme
    fig, ax = plt.subplots(figsize=(9.5, 7.2), dpi=300)
    setup_drawio_canvas(ax, (0, 10), (0, 9.2))

    # Draw.io Classic Palette
    drawio_swim_b = dict(boxstyle="square,pad=0.5", fc="#DAE8FC", ec="#6C8EBF", lw=1.8)
    drawio_swim_g = dict(boxstyle="square,pad=0.5", fc="#D5E8D4", ec="#82B366", lw=1.8)
    node_start = dict(boxstyle="round4,pad=0.5", fc="#D5E8D4", ec="#82B366", lw=1.5)
    node_proc_b = dict(boxstyle="round,pad=0.5", fc="#DAE8FC", ec="#6C8EBF", lw=1.4)
    node_proc_g = dict(boxstyle="round,pad=0.5", fc="#D5E8D4", ec="#82B366", lw=1.4)
    node_proc_y = dict(boxstyle="round,pad=0.5", fc="#FFF2CC", ec="#D6B656", lw=1.4)
    node_proc_gray = dict(boxstyle="round,pad=0.5", fc="#F5F5F5", ec="#666666", lw=1.4)
    node_decision = dict(boxstyle="square,pad=0.5", fc="#FFE6CC", ec="#D79B00", lw=1.5)

    # Swimlane Headers
    ax.text(2.6, 8.6, "ENTITAS KARYAWAN", ha="center", va="center", fontsize=11, fontweight="bold", color="#1B365D", bbox=drawio_swim_b)
    ax.text(7.4, 8.6, "ENTITAS ADMIN HR", ha="center", va="center", fontsize=11, fontweight="bold", color="#274E13", bbox=drawio_swim_g)
    ax.axvline(x=5.0, ymin=0.03, ymax=0.95, color="#D0D0D0", linestyle="--", lw=1.2)

    # Nodes Karyawan
    ax.text(2.6, 7.7, "Mulai:\nTiba di Kampus UNPAM Viktor 2", ha="center", va="center", fontsize=9, color="#274E13", bbox=node_start)
    ax.text(2.6, 6.3, "Tanda Tangan Manual Buku Absensi\n(Tanpa Verifikasi GPS / Rawan Titip Absen)", ha="center", va="center", fontsize=8.8, color="#1B365D", bbox=node_proc_b)
    ax.text(2.6, 4.8, "Mengisi Formulir Kertas Cuti atau\nKirim Pesan WhatsApp Pribadi", ha="center", va="center", fontsize=8.8, color="#1B365D", bbox=node_proc_b)
    ax.text(2.6, 2.0, "Menerima Putusan Cuti\n(Menunggu 3 hingga 5 Hari)", ha="center", va="center", fontsize=8.8, color="#274E13", bbox=node_proc_g)

    # Nodes Admin HR
    ax.text(7.4, 4.8, "Menerima Berkas Kertas Cuti /\nPesan WhatsApp dari Karyawan", ha="center", va="center", fontsize=8.8, color="#274E13", bbox=node_proc_g)
    ax.text(7.4, 3.4, "Memeriksa Sisa Kuota Cuti di\nBuku Catatan Arsip Manual", ha="center", va="center", fontsize=8.8, color="#7F6000", bbox=node_proc_y)
    ax.text(7.4, 2.0, "Pengajuan\nDisetujui?", ha="center", va="center", fontsize=9, fontweight="bold", color="#804000", bbox=node_decision)
    ax.text(7.4, 0.7, "Akhir Bulan: Salin Manual Data Presensi\nke Microsoft Excel (Menyita 3-5 Hari)", ha="center", va="center", fontsize=8.5, color="#333333", bbox=node_proc_gray)

    # Orthogonal Arrows
    arrow = dict(arrowstyle="->", color="#333333", lw=1.5)
    ax.annotate("", xy=(2.6, 6.8), xytext=(2.6, 7.3), arrowprops=arrow)
    ax.annotate("", xy=(2.6, 5.3), xytext=(2.6, 5.8), arrowprops=arrow)
    ax.annotate("", xy=(5.8, 4.8), xytext=(4.2, 4.8), arrowprops=arrow)
    ax.annotate("", xy=(7.4, 3.9), xytext=(7.4, 4.3), arrowprops=arrow)
    ax.annotate("", xy=(7.4, 2.5), xytext=(7.4, 2.9), arrowprops=arrow)
    ax.annotate("Ya / Tolak", xy=(4.1, 2.0), xytext=(6.3, 2.0), arrowprops=arrow, fontsize=8.5, fontweight="bold", color="#333333")
    ax.annotate("", xy=(7.4, 1.2), xytext=(7.4, 1.6), arrowprops=arrow)

    img_out = os.path.join(OUT_IMG_DIR, "flowchart_berjalan.png")
    plt.savefig(img_out, bbox_inches="tight", facecolor="white")
    plt.close()
    print("Saved Draw.io styled PNG:", img_out)

# ================= 2. FLOWCHART USULAN PRESENSI =================
def build_flowchart_usulan_presensi():
    # XML Draw.io
    xml = """<mxfile host="app.diagrams.net" modified="2026-11-18T01:30:00.000Z" agent="Draw.io" version="24.7.5">
  <diagram id="flow_presensi" name="Flowchart Presensi GPS">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        
        <!-- Pool Karyawan -->
        <mxCell id="pool_k" value="KARYAWAN (PONSEL PRIBADI)" style="swimlane;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1b365d;fontStyle=1;fontSize=13;" vertex="1" parent="1">
          <mxGeometry x="40" y="40" width="350" height="920" as="geometry"/>
        </mxCell>
        <mxCell id="kp1" value="Mulai: Buka Web hadir. di Ponsel" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontColor=#274e13;fontSize=11;" vertex="1" parent="pool_k">
          <mxGeometry x="50" y="50" width="250" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="kp2" value="Peringatan: Harap Aktifkan GPS Ponsel&#xa;(Tombol Login &amp; Presensi Dikunci)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;fontColor=#990000;fontSize=11;" vertex="1" parent="pool_k">
          <mxGeometry x="40" y="160" width="270" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="kp3" value="Peringatan: Di Luar Area Kantor&#xa;(Akses Absen Ditolak / Tombol Terkunci)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;fontColor=#990000;fontSize=11;" vertex="1" parent="pool_k">
          <mxGeometry x="40" y="380" width="270" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="kp4" value="Masukkan Email &amp; Kata Sandi,&#xa;Lalu Klik &quot;Masuk ke Akun&quot;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=11;" vertex="1" parent="pool_k">
          <mxGeometry x="40" y="500" width="270" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="kp5" value="Notifikasi Presensi Berhasil&#xa;Muncul di Layar HP Karyawan" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontColor=#274e13;fontSize=11;" vertex="1" parent="pool_k">
          <mxGeometry x="40" y="730" width="270" height="60" as="geometry"/>
        </mxCell>

        <!-- Pool Sistem -->
        <mxCell id="pool_s" value="SISTEM hadir. &amp; GPS SERVER" style="swimlane;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontColor=#274e13;fontStyle=1;fontSize=13;" vertex="1" parent="1">
          <mxGeometry x="430" y="40" width="350" height="920" as="geometry"/>
        </mxCell>
        <mxCell id="sp1" value="Deteksi Koordinat GPS Ponsel&#xa;(Geolocation API Ponsel)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=11;" vertex="1" parent="pool_s">
          <mxGeometry x="40" y="50" width="270" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="sp2" value="Apakah GPS&#xa;HP Aktif?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=11;fontStyle=1;" vertex="1" parent="pool_s">
          <mxGeometry x="110" y="150" width="130" height="80" as="geometry"/>
        </mxCell>
        <mxCell id="sp3" value="Hitung Jarak Koordinat HP ke&#xa;Titik Acuan UNPAM Viktor 2" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=11;" vertex="1" parent="pool_s">
          <mxGeometry x="40" y="270" width="270" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="sp4" value="Jarak &lt;=&#xa;100 Meter?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=11;fontStyle=1;" vertex="1" parent="pool_s">
          <mxGeometry x="110" y="370" width="130" height="80" as="geometry"/>
        </mxCell>
        <mxCell id="sp5" value="Status: Area UNPAM Viktor 2&#xa;(Tombol Presensi Terbuka)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontColor=#274e13;fontSize=11;" vertex="1" parent="pool_s">
          <mxGeometry x="40" y="500" width="270" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="sp6" value="Simpan Log Presensi Otomatis:&#xa;* NIP Pegawai &amp; Jam Masuk (WIB)&#xa;* Jarak Meter GPS &amp; Tanggal&#xa;* Status Tepat Waktu / Terlambat" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#ffe6cc;strokeColor=#d79b00;fontSize=11;" vertex="1" parent="pool_s">
          <mxGeometry x="40" y="600" width="270" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="sp7" value="Log Kehadiran Otomatis Tampil&#xa;di Dasbor Admin HR (Real-Time)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontColor=#274e13;fontSize=11;" vertex="1" parent="pool_s">
          <mxGeometry x="40" y="730" width="270" height="60" as="geometry"/>
        </mxCell>
        
        <!-- Selesai -->
        <mxCell id="end_node" value="Selesai" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontColor=#274e13;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="340" y="870" width="140" height="50" as="geometry"/>
        </mxCell>

        <!-- Connectors -->
        <mxCell id="ce1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#333333;" edge="1" parent="1" source="kp1" target="sp1"/>
        <mxCell id="ce2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#333333;" edge="1" parent="1" source="sp1" target="sp2"/>
        <mxCell id="ce3" value="Tidak" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#b85450;fontColor=#990000;fontStyle=1;" edge="1" parent="1" source="sp2" target="kp2"/>
        <mxCell id="ce4" value="Ya" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#82b366;fontColor=#274e13;fontStyle=1;" edge="1" parent="1" source="sp2" target="sp3"/>
        <mxCell id="ce5" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#333333;" edge="1" parent="1" source="sp3" target="sp4"/>
        <mxCell id="ce6" value="Tidak" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#b85450;fontColor=#990000;fontStyle=1;" edge="1" parent="1" source="sp4" target="kp3"/>
        <mxCell id="ce7" value="Ya" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#82b366;fontColor=#274e13;fontStyle=1;" edge="1" parent="1" source="sp4" target="sp5"/>
        <mxCell id="ce8" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#333333;" edge="1" parent="1" source="sp5" target="kp4"/>
        <mxCell id="ce9" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#333333;" edge="1" parent="1" source="kp4" target="sp6"/>
        <mxCell id="ce10" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#333333;" edge="1" parent="1" source="sp6" target="sp7"/>
        <mxCell id="ce11" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#333333;" edge="1" parent="1" source="sp6" target="kp5"/>
        <mxCell id="ce12" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#333333;" edge="1" parent="1" source="kp5" target="end_node"/>
        <mxCell id="ce13" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#333333;" edge="1" parent="1" source="sp7" target="end_node"/>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>"""
    save_drawio("flowchart_usulan_presensi.drawio", xml)

    # Render PNG
    fig, ax = plt.subplots(figsize=(9.5, 9.8), dpi=300)
    setup_drawio_canvas(ax, (0, 10), (0, 12))

    drawio_swim_b = dict(boxstyle="square,pad=0.5", fc="#DAE8FC", ec="#6C8EBF", lw=1.8)
    drawio_swim_g = dict(boxstyle="square,pad=0.5", fc="#D5E8D4", ec="#82B366", lw=1.8)
    node_start = dict(boxstyle="round4,pad=0.5", fc="#D5E8D4", ec="#82B366", lw=1.5)
    node_proc_b = dict(boxstyle="round,pad=0.5", fc="#DAE8FC", ec="#6C8EBF", lw=1.4)
    node_proc_g = dict(boxstyle="round,pad=0.5", fc="#D5E8D4", ec="#82B366", lw=1.4)
    node_proc_o = dict(boxstyle="round,pad=0.5", fc="#FFE6CC", ec="#D79B00", lw=1.4)
    node_alert = dict(boxstyle="round,pad=0.5", fc="#F8CECC", ec="#B85450", lw=1.4)
    node_decision = dict(boxstyle="square,pad=0.5", fc="#FFF2CC", ec="#D6B656", lw=1.5)

    ax.text(2.6, 11.5, "KARYAWAN (PONSEL PRIBADI)", ha="center", va="center", fontsize=11, fontweight="bold", color="#1B365D", bbox=drawio_swim_b)
    ax.text(7.4, 11.5, "SISTEM hadir. & GPS SERVER", ha="center", va="center", fontsize=11, fontweight="bold", color="#274E13", bbox=drawio_swim_g)
    ax.axvline(x=5.0, ymin=0.03, ymax=0.96, color="#CBD5E1", linestyle="--", lw=1.2)

    ax.text(2.6, 10.7, "Mulai:\nBuka Web hadir. di Ponsel", ha="center", va="center", fontsize=9, color="#274E13", bbox=node_start)
    ax.text(7.4, 10.7, "Deteksi Koordinat GPS HP\n(Geolocation API Ponsel)", ha="center", va="center", fontsize=8.8, color="#274E13", bbox=node_proc_g)
    ax.text(7.4, 9.4, "Apakah GPS\nHP Aktif?", ha="center", va="center", fontsize=9, fontweight="bold", color="#7F6000", bbox=node_decision)
    ax.text(2.6, 9.4, "Peringatan: Harap Aktifkan GPS HP\n(Tombol Login & Presensi Dikunci)", ha="center", va="center", fontsize=8.5, color="#990000", bbox=node_alert)
    ax.text(7.4, 8.0, "Hitung Jarak Koordinat HP\nke Titik Kampus UNPAM Viktor 2", ha="center", va="center", fontsize=8.8, color="#274E13", bbox=node_proc_g)
    ax.text(7.4, 6.6, "Jarak <=\n100 Meter?", ha="center", va="center", fontsize=9, fontweight="bold", color="#7F6000", bbox=node_decision)
    ax.text(2.6, 6.6, "Peringatan: Di Luar Area Kantor\n(Akses Ditolak / Dilarang Absen)", ha="center", va="center", fontsize=8.5, color="#990000", bbox=node_alert)
    ax.text(7.4, 5.2, "Status: Area UNPAM Viktor 2\n(Tombol Presensi Terbuka)", ha="center", va="center", fontsize=8.8, color="#274E13", bbox=node_proc_g)
    ax.text(2.6, 5.2, "Masukkan Email & Sandi,\nLalu Klik \"Masuk ke Akun\"", ha="center", va="center", fontsize=8.8, color="#1B365D", bbox=node_proc_b)
    ax.text(7.4, 3.8, "Simpan Log Presensi Otomatis:\n* NIP Pegawai & Jam Masuk (WIB)\n* Jarak Meter GPS & Tanggal\n* Status Tepat Waktu / Terlambat", ha="center", va="center", fontsize=8.5, color="#804000", bbox=node_proc_o)
    ax.text(2.6, 2.3, "Notifikasi Presensi Berhasil\nMuncul di Layar HP Karyawan", ha="center", va="center", fontsize=8.5, color="#274E13", bbox=node_proc_g)
    ax.text(7.4, 2.3, "Log Kehadiran Otomatis Tampil\ndi Dasbor Admin HR (Real-Time)", ha="center", va="center", fontsize=8.5, color="#274E13", bbox=node_proc_g)
    ax.text(5.0, 1.0, "Selesai", ha="center", va="center", fontsize=9.5, fontweight="bold", color="#274E13", bbox=node_start)

    arrow = dict(arrowstyle="->", color="#333333", lw=1.5)
    ax.annotate("", xy=(5.9, 10.7), xytext=(4.1, 10.7), arrowprops=arrow)
    ax.annotate("", xy=(7.4, 9.9), xytext=(7.4, 10.2), arrowprops=arrow)
    ax.annotate("Tidak", xy=(4.2, 9.4), xytext=(6.3, 9.4), arrowprops=arrow, fontsize=8.5, fontweight="bold", color="#B85450")
    ax.annotate("Ya", xy=(7.4, 8.5), xytext=(7.4, 8.9), arrowprops=arrow, fontsize=8.5, fontweight="bold", color="#82B366")
    ax.annotate("", xy=(7.4, 7.1), xytext=(7.4, 7.5), arrowprops=arrow)
    ax.annotate("Tidak", xy=(4.2, 6.6), xytext=(6.3, 6.6), arrowprops=arrow, fontsize=8.5, fontweight="bold", color="#B85450")
    ax.annotate("Ya", xy=(7.4, 5.7), xytext=(7.4, 6.1), arrowprops=arrow, fontsize=8.5, fontweight="bold", color="#82B366")
    ax.annotate("", xy=(4.1, 5.2), xytext=(5.9, 5.2), arrowprops=arrow)
    ax.annotate("", xy=(5.8, 3.8), xytext=(2.6, 4.6), arrowprops=arrow)
    ax.annotate("", xy=(7.4, 2.8), xytext=(7.4, 3.2), arrowprops=arrow)
    ax.annotate("", xy=(4.1, 2.3), xytext=(5.9, 2.3), arrowprops=arrow)
    ax.annotate("", xy=(4.6, 1.2), xytext=(3.0, 1.8), arrowprops=arrow)
    ax.annotate("", xy=(5.4, 1.2), xytext=(7.0, 1.8), arrowprops=arrow)

    img_out = os.path.join(OUT_IMG_DIR, "flowchart_usulan_presensi.png")
    plt.savefig(img_out, bbox_inches="tight", facecolor="white")
    plt.close()
    print("Saved Draw.io styled PNG:", img_out)

# ================= 3. FLOWCHART USULAN CUTI =================
def build_flowchart_usulan_cuti():
    # XML Draw.io
    xml = """<mxfile host="app.diagrams.net" modified="2026-11-18T01:30:00.000Z" agent="Draw.io" version="24.7.5">
  <diagram id="flow_cuti" name="Flowchart Cuti Online">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        
        <!-- Pool Karyawan -->
        <mxCell id="pool_kc" value="KARYAWAN (PEMOHON CUTI)" style="swimlane;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1b365d;fontStyle=1;fontSize=13;" vertex="1" parent="1">
          <mxGeometry x="40" y="40" width="350" height="920" as="geometry"/>
        </mxCell>
        <mxCell id="kc1" value="Mulai: Pilih Menu Pengajuan Cuti" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontColor=#274e13;fontSize=11;" vertex="1" parent="pool_kc">
          <mxGeometry x="50" y="50" width="250" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="kc2" value="Mengisi Formulir Digital:&#xa;* Jenis Cuti (Tahunan/Sakit/Penting)&#xa;* Tanggal &amp; Durasi Hari&#xa;* Alasan Pengajuan Izin" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=11;" vertex="1" parent="pool_kc">
          <mxGeometry x="40" y="150" width="270" height="70" as="geometry"/>
        </mxCell>
        <mxCell id="kc3" value="Klik &quot;Kirim Pengajuan Cuti&quot;&#xa;secara Paperless" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontSize=11;" vertex="1" parent="pool_kc">
          <mxGeometry x="40" y="270" width="270" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="kc4" value="Notifikasi Putusan Langsung Muncul&#xa;di Layar HP Karyawan (ACC / Ditolak)" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontColor=#274e13;fontSize=11;" vertex="1" parent="pool_kc">
          <mxGeometry x="40" y="730" width="270" height="60" as="geometry"/>
        </mxCell>

        <!-- Pool Admin HR -->
        <mxCell id="pool_ac" value="ADMIN HR &amp; SISTEM hadir." style="swimlane;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontColor=#274e13;fontStyle=1;fontSize=13;" vertex="1" parent="1">
          <mxGeometry x="430" y="40" width="350" height="920" as="geometry"/>
        </mxCell>
        <mxCell id="ac1" value="Sistem Menyimpan Pengajuan&#xa;dengan Status: &quot;Menunggu&quot;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=11;" vertex="1" parent="pool_ac">
          <mxGeometry x="40" y="270" width="270" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="ac2" value="Admin HR Membuka Dasbor &amp;&#xa;Memeriksa Sisa Kuota serta Alasan" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontSize=11;" vertex="1" parent="pool_ac">
          <mxGeometry x="40" y="380" width="270" height="50" as="geometry"/>
        </mxCell>
        <mxCell id="ac3" value="Pengajuan&#xa;Disetujui?" style="rhombus;whiteSpace=wrap;html=1;fillColor=#fff2cc;strokeColor=#d6b656;fontSize=11;fontStyle=1;" vertex="1" parent="pool_ac">
          <mxGeometry x="110" y="480" width="130" height="80" as="geometry"/>
        </mxCell>
        <mxCell id="ac4" value="Disetujui: Potong Kuota Cuti&#xa;&amp; Status: &quot;Disetujui&quot;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontColor=#274e13;fontSize=11;" vertex="1" parent="pool_ac">
          <mxGeometry x="10" y="600" width="150" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="ac5" value="Ditolak: Catat Alasan&#xa;&amp; Status: &quot;Ditolak&quot;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#f8cecc;strokeColor=#b85450;fontColor=#990000;fontSize=11;" vertex="1" parent="pool_ac">
          <mxGeometry x="190" y="600" width="150" height="60" as="geometry"/>
        </mxCell>
        <mxCell id="ac6" value="Rekap Data Cuti Otomatis Tersimpan&#xa;di Laporan Bulanan HR" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontColor=#274e13;fontSize=11;" vertex="1" parent="pool_ac">
          <mxGeometry x="40" y="730" width="270" height="60" as="geometry"/>
        </mxCell>

        <!-- Selesai -->
        <mxCell id="end_cuti" value="Selesai" style="ellipse;whiteSpace=wrap;html=1;fillColor=#d5e8d4;strokeColor=#82b366;fontColor=#274e13;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="340" y="870" width="140" height="50" as="geometry"/>
        </mxCell>

        <!-- Edges -->
        <mxCell id="kec1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#333333;" edge="1" parent="1" source="kc1" target="kc2"/>
        <mxCell id="kec2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#333333;" edge="1" parent="1" source="kc2" target="kc3"/>
        <mxCell id="kec3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#333333;" edge="1" parent="1" source="kc3" target="ac1"/>
        <mxCell id="kec4" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#333333;" edge="1" parent="1" source="ac1" target="ac2"/>
        <mxCell id="kec5" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#333333;" edge="1" parent="1" source="ac2" target="ac3"/>
        <mxCell id="kec6" value="Ya" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#82b366;fontColor=#274e13;fontStyle=1;" edge="1" parent="1" source="ac3" target="ac4"/>
        <mxCell id="kec7" value="Tidak" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#b85450;fontColor=#990000;fontStyle=1;" edge="1" parent="1" source="ac3" target="ac5"/>
        <mxCell id="kec8" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#333333;" edge="1" parent="1" source="ac4" target="kc4"/>
        <mxCell id="kec9" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#333333;" edge="1" parent="1" source="ac5" target="kc4"/>
        <mxCell id="kec10" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#333333;" edge="1" parent="1" source="ac4" target="ac6"/>
        <mxCell id="kec11" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#333333;" edge="1" parent="1" source="ac5" target="ac6"/>
        <mxCell id="kec12" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#333333;" edge="1" parent="1" source="kc4" target="end_cuti"/>
        <mxCell id="kec13" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=1.5;strokeColor=#333333;" edge="1" parent="1" source="ac6" target="end_cuti"/>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>"""
    save_drawio("flowchart_usulan_cuti.drawio", xml)

    # Render PNG
    fig, ax = plt.subplots(figsize=(9.5, 9.8), dpi=300)
    setup_drawio_canvas(ax, (0, 10), (0, 12))

    drawio_swim_b = dict(boxstyle="square,pad=0.5", fc="#DAE8FC", ec="#6C8EBF", lw=1.8)
    drawio_swim_g = dict(boxstyle="square,pad=0.5", fc="#D5E8D4", ec="#82B366", lw=1.8)
    node_start = dict(boxstyle="round4,pad=0.5", fc="#D5E8D4", ec="#82B366", lw=1.5)
    node_proc_b = dict(boxstyle="round,pad=0.5", fc="#DAE8FC", ec="#6C8EBF", lw=1.4)
    node_proc_g = dict(boxstyle="round,pad=0.5", fc="#D5E8D4", ec="#82B366", lw=1.4)
    node_proc_y = dict(boxstyle="round,pad=0.5", fc="#FFF2CC", ec="#D6B656", lw=1.4)
    node_alert = dict(boxstyle="round,pad=0.5", fc="#F8CECC", ec="#B85450", lw=1.4)
    node_decision = dict(boxstyle="square,pad=0.5", fc="#FFF2CC", ec="#D6B656", lw=1.5)

    ax.text(2.6, 11.5, "KARYAWAN (PEMOHON)", ha="center", va="center", fontsize=11, fontweight="bold", color="#1B365D", bbox=drawio_swim_b)
    ax.text(7.4, 11.5, "ADMIN HR & SISTEM hadir.", ha="center", va="center", fontsize=11, fontweight="bold", color="#274E13", bbox=drawio_swim_g)
    ax.axvline(x=5.0, ymin=0.03, ymax=0.96, color="#CBD5E1", linestyle="--", lw=1.2)

    ax.text(2.6, 10.7, "Mulai:\nPilih Menu Pengajuan Cuti", ha="center", va="center", fontsize=9, color="#274E13", bbox=node_start)
    ax.text(2.6, 9.3, "Mengisi Formulir Digital:\n* Jenis Cuti (Tahunan/Sakit/Penting)\n* Tanggal & Durasi Hari\n* Alasan Pengajuan Izin", ha="center", va="center", fontsize=8.5, color="#1B365D", bbox=node_proc_b)
    ax.text(2.6, 7.8, "Klik \"Kirim Pengajuan Cuti\"\nsecara Paperless", ha="center", va="center", fontsize=8.8, color="#1B365D", bbox=node_proc_b)
    ax.text(7.4, 7.8, "Sistem Menyimpan Pengajuan\ndengan Status: \"Menunggu\"", ha="center", va="center", fontsize=8.8, color="#7F6000", bbox=node_proc_y)
    ax.text(7.4, 6.4, "Admin HR Membuka Dasbor &\nMemeriksa Sisa Kuota serta Alasan", ha="center", va="center", fontsize=8.8, color="#274E13", bbox=node_proc_g)
    ax.text(7.4, 5.0, "Pengajuan\nDisetujui?", ha="center", va="center", fontsize=9, fontweight="bold", color="#7F6000", bbox=node_decision)
    ax.text(5.5, 3.6, "Disetujui:\nPotong Kuota Cuti &\nStatus: \"Disetujui\"", ha="center", va="center", fontsize=8.5, color="#274E13", bbox=node_proc_g)
    ax.text(8.8, 3.6, "Ditolak:\nCatat Alasan Penolakan &\nStatus: \"Ditolak\"", ha="center", va="center", fontsize=8.5, color="#990000", bbox=node_alert)
    ax.text(2.6, 2.3, "Notifikasi Putusan Langsung\nMuncul di Layar HP Karyawan\n(Pemberitahuan ACC / Ditolak)", ha="center", va="center", fontsize=8.5, color="#274E13", bbox=node_proc_g)
    ax.text(7.4, 2.3, "Rekap Data Cuti Otomatis\nTersimpan di Laporan Bulanan HR", ha="center", va="center", fontsize=8.5, color="#274E13", bbox=node_proc_g)
    ax.text(5.0, 1.0, "Selesai", ha="center", va="center", fontsize=9.5, fontweight="bold", color="#274E13", bbox=node_start)

    arrow = dict(arrowstyle="->", color="#333333", lw=1.5)
    ax.annotate("", xy=(2.6, 9.9), xytext=(2.6, 10.3), arrowprops=arrow)
    ax.annotate("", xy=(2.6, 8.3), xytext=(2.6, 8.7), arrowprops=arrow)
    ax.annotate("", xy=(5.9, 7.8), xytext=(4.1, 7.8), arrowprops=arrow)
    ax.annotate("", xy=(7.4, 6.9), xytext=(7.4, 7.3), arrowprops=arrow)
    ax.annotate("", xy=(7.4, 5.5), xytext=(7.4, 5.9), arrowprops=arrow)
    ax.annotate("Ya", xy=(5.8, 4.2), xytext=(6.7, 4.8), arrowprops=arrow, fontsize=8.5, fontweight="bold", color="#82B366")
    ax.annotate("Tidak", xy=(8.4, 4.2), xytext=(8.0, 4.8), arrowprops=arrow, fontsize=8.5, fontweight="bold", color="#B85450")
    ax.annotate("", xy=(4.1, 2.3), xytext=(5.2, 3.1), arrowprops=arrow)
    ax.annotate("", xy=(7.4, 2.8), xytext=(6.0, 3.1), arrowprops=arrow)
    ax.annotate("", xy=(7.4, 2.8), xytext=(8.3, 3.1), arrowprops=arrow)
    ax.annotate("", xy=(4.6, 1.2), xytext=(3.0, 1.8), arrowprops=arrow)
    ax.annotate("", xy=(5.4, 1.2), xytext=(7.0, 1.8), arrowprops=arrow)

    img_out = os.path.join(OUT_IMG_DIR, "flowchart_usulan_cuti.png")
    plt.savefig(img_out, bbox_inches="tight", facecolor="white")
    plt.close()
    print("Saved Draw.io styled PNG:", img_out)

# ================= 4. ERD DIAGRAM =================
def build_erd():
    # XML Draw.io
    xml = """<mxfile host="app.diagrams.net" modified="2026-11-18T01:30:00.000Z" agent="Draw.io" version="24.7.5">
  <diagram id="erd_diagram" name="ERD Sistem hadir.">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169" math="0" shadow="0">
      <root>
        <mxCell id="0"/>
        <mxCell id="1" parent="0"/>
        
        <!-- Entity Karyawan -->
        <mxCell id="ent_karyawan" value="TABEL KARYAWAN&#xa;&#xa;* ID Pegawai (Kunci Utama)&#xa;* NIP (Teks)&#xa;* Nama Lengkap (Teks)&#xa;* Email Dinas (Teks)&#xa;* Kata Sandi (Teks)&#xa;* Jabatan (Teks)&#xa;* Divisi Kerja (Teks)&#xa;* Status Keaktifan (Teks)" style="shape=table;startSize=30;container=1;collapsible=0;childLayout=tableLayout;fixedRows=1;rowLines=0;fontStyle=1;align=center;resizeLast=1;fillColor=#dae8fc;strokeColor=#6c8ebf;fontColor=#1b365d;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="60" y="60" width="260" height="200" as="geometry"/>
        </mxCell>

        <!-- Entity Log Presensi -->
        <mxCell id="ent_presensi" value="TABEL LOG PRESENSI&#xa;&#xa;* ID Presensi (Kunci Utama)&#xa;* NIP Pegawai (Penghubung)&#xa;* Titik Kantor (Penghubung)&#xa;* Jam Masuk (Waktu)&#xa;* Tanggal Hadir (Tanggal)&#xa;* Jarak GPS (Angka/Meter)&#xa;* Status Kehadiran (Teks)" style="shape=table;startSize=30;container=1;collapsible=0;childLayout=tableLayout;fixedRows=1;rowLines=0;fontStyle=1;align=center;resizeLast=1;fillColor=#d5e8d4;strokeColor=#82b366;fontColor=#274e13;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="460" y="60" width="260" height="190" as="geometry"/>
        </mxCell>

        <!-- Entity Cuti -->
        <mxCell id="ent_cuti" value="TABEL PENGAJUAN CUTI&#xa;&#xa;* ID Cuti (Kunci Utama)&#xa;* NIP Pemohon (Penghubung)&#xa;* Jenis Cuti (Teks)&#xa;* Tanggal Izin (Tanggal)&#xa;* Durasi Hari (Teks)&#xa;* Alasan Izin (Teks)&#xa;* Status Putusan (Teks)" style="shape=table;startSize=30;container=1;collapsible=0;childLayout=tableLayout;fixedRows=1;rowLines=0;fontStyle=1;align=center;resizeLast=1;fillColor=#fff2cc;strokeColor=#d6b656;fontColor=#7f6000;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="60" y="340" width="260" height="190" as="geometry"/>
        </mxCell>

        <!-- Entity Kantor -->
        <mxCell id="ent_kantor" value="TABEL LOKASI KANTOR&#xa;&#xa;* ID Kantor (Kunci Utama)&#xa;* Nama Tempat: UNPAM Viktor 2&#xa;* Titik GPS: Lintang &amp; Bujur&#xa;* Batas Aman: 100 Meter" style="shape=table;startSize=30;container=1;collapsible=0;childLayout=tableLayout;fixedRows=1;rowLines=0;fontStyle=1;align=center;resizeLast=1;fillColor=#e1d5e7;strokeColor=#9673a6;fontColor=#4c004c;fontSize=11;" vertex="1" parent="1">
          <mxGeometry x="460" y="340" width="260" height="150" as="geometry"/>
        </mxCell>

        <!-- Relasi Karyawan - Presensi -->
        <mxCell id="rel1" value="1 : M (Mencatat Presensi)" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#1b365d;fontSize=11;fontStyle=1;" edge="1" parent="1" source="ent_karyawan" target="ent_presensi"/>

        <!-- Relasi Karyawan - Cuti -->
        <mxCell id="rel2" value="1 : M (Mengajukan Cuti)" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#1b365d;fontSize=11;fontStyle=1;" edge="1" parent="1" source="ent_karyawan" target="ent_cuti"/>

        <!-- Relasi Kantor - Presensi -->
        <mxCell id="rel3" value="1 : M (Titik Validasi GPS)" style="edgeStyle=orthogonalEdgeStyle;rounded=0;html=1;strokeWidth=2;strokeColor=#1b365d;fontSize=11;fontStyle=1;" edge="1" parent="1" source="ent_kantor" target="ent_presensi"/>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>"""
    save_drawio("erd_diagram.drawio", xml)

    # Render PNG
    fig, ax = plt.subplots(figsize=(10, 6.6), dpi=300)
    setup_drawio_canvas(ax, (0, 10), (0, 7.2))

    # Draw.io Classic Table Entity Boxes
    head_b = dict(boxstyle="square,pad=0.4", fc="#DAE8FC", ec="#6C8EBF", lw=1.6)
    body_b = dict(boxstyle="square,pad=0.5", fc="#F8FBFE", ec="#6C8EBF", lw=1.2)

    head_g = dict(boxstyle="square,pad=0.4", fc="#D5E8D4", ec="#82B366", lw=1.6)
    body_g = dict(boxstyle="square,pad=0.5", fc="#F9FCF9", ec="#82B366", lw=1.2)

    head_y = dict(boxstyle="square,pad=0.4", fc="#FFF2CC", ec="#D6B656", lw=1.6)
    body_y = dict(boxstyle="square,pad=0.5", fc="#FFFDF7", ec="#D6B656", lw=1.2)

    head_p = dict(boxstyle="square,pad=0.4", fc="#E1D5E7", ec="#9673A6", lw=1.6)
    body_p = dict(boxstyle="square,pad=0.5", fc="#FAF8FC", ec="#9673A6", lw=1.2)

    # 1. KARYAWAN
    ax.text(2.2, 6.4, "TABEL KARYAWAN", ha="center", va="center", fontsize=9.5, fontweight="bold", color="#1B365D", bbox=head_b)
    karyawan_text = "* ID Pegawai (Kunci Utama)\n* NIP (Teks)\n* Nama Lengkap (Teks)\n* Email Dinas (Teks)\n* Kata Sandi (Teks)\n* Jabatan (Teks)\n* Divisi Kerja (Teks)\n* Status Keaktifan (Teks)"
    ax.text(2.2, 4.8, karyawan_text, ha="left", va="center", fontsize=8.2, family="sans-serif", color="#333333", bbox=body_b)

    # 2. LOG PRESENSI
    ax.text(7.8, 6.4, "TABEL LOG PRESENSI", ha="center", va="center", fontsize=9.5, fontweight="bold", color="#274E13", bbox=head_g)
    att_text = "* ID Presensi (Kunci Utama)\n* NIP Pegawai (Penghubung)\n* Titik Kantor (Penghubung)\n* Jam Masuk (Waktu)\n* Tanggal Hadir (Tanggal)\n* Jarak GPS (Angka/Meter)\n* Status Kehadiran (Teks)"
    ax.text(7.8, 4.8, att_text, ha="left", va="center", fontsize=8.2, family="sans-serif", color="#333333", bbox=body_g)

    # 3. PENGAJUAN CUTI
    ax.text(2.2, 2.5, "TABEL PENGAJUAN CUTI", ha="center", va="center", fontsize=9.5, fontweight="bold", color="#7F6000", bbox=head_y)
    leave_text = "* ID Cuti (Kunci Utama)\n* NIP Pemohon (Penghubung)\n* Jenis Cuti (Teks)\n* Tanggal Izin (Tanggal)\n* Durasi Hari (Teks)\n* Alasan Izin (Teks)\n* Status Putusan (Teks)"
    ax.text(2.2, 1.2, leave_text, ha="left", va="center", fontsize=8.2, family="sans-serif", color="#333333", bbox=body_y)

    # 4. LOKASI KANTOR
    ax.text(7.8, 2.5, "TABEL LOKASI KANTOR", ha="center", va="center", fontsize=9.5, fontweight="bold", color="#4C004C", bbox=head_p)
    office_text = "* ID Kantor (Kunci Utama)\n* Nama Tempat: UNPAM Viktor 2\n* Titik GPS: Lintang & Bujur\n* Batas Aman: 100 Meter"
    ax.text(7.8, 1.4, office_text, ha="left", va="center", fontsize=8.2, family="sans-serif", color="#333333", bbox=body_p)

    # Orthogonal relations
    line = dict(color="#6C8EBF", lw=1.8)
    ax.plot([3.8, 6.3], [5.0, 5.0], **line)
    ax.text(4.0, 5.2, "1", fontsize=9, fontweight="bold", color="#1B365D")
    ax.text(6.1, 5.2, "M", fontsize=9, fontweight="bold", color="#1B365D")
    ax.text(5.05, 5.25, "mencatat presensi", fontsize=8, ha="center", color="#555555")

    ax.plot([2.2, 2.2], [3.8, 2.7], **line)
    ax.text(2.4, 3.6, "1", fontsize=9, fontweight="bold", color="#1B365D")
    ax.text(2.4, 2.9, "M", fontsize=9, fontweight="bold", color="#1B365D")

    ax.plot([7.8, 7.8], [2.7, 3.8], **line)
    ax.text(8.0, 2.9, "1", fontsize=9, fontweight="bold", color="#1B365D")
    ax.text(8.0, 3.6, "M", fontsize=9, fontweight="bold", color="#1B365D")

    img_out = os.path.join(OUT_IMG_DIR, "erd_diagram.png")
    plt.savefig(img_out, bbox_inches="tight", facecolor="white")
    plt.close()
    print("Saved Draw.io styled PNG:", img_out)

if __name__ == "__main__":
    build_flowchart_berjalan()
    build_flowchart_usulan_presensi()
    build_flowchart_usulan_cuti()
    build_erd()
