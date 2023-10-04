"use client";
import { Page, Text, Document, PDFDownloadLink } from "@react-pdf/renderer";
import { Button } from "@/components/ui/button";

function Certificate({ name }: { name: string }) {
    return (
        <Document>
            <Page>
                <Text>{name}</Text>
            </Page>
        </Document>
    );
}

export default function CertificatePage() {
    return (
        <PDFDownloadLink
            document={<Certificate name="hello" />}
            fileName="hello"
        >
            <Button>Download</Button>
        </PDFDownloadLink>
    );
}
