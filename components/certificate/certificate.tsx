import { Page, Text, Document } from "@react-pdf/renderer";

export function Certificate({ name }: { name: string }) {
    return (
        <Document>
            <Page>
                <Text>{name}</Text>
            </Page>
        </Document>
    );
}
