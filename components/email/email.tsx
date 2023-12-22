import {
    Body,
    Button,
    Column,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";
import React from "react";

interface OptimizeEMailProps {
    id: string;
    qrCode: string;
    full_name: string;
    workshop: string;
    accepted: boolean;
}

export default function OptimizeEMail({
    full_name,
    id,
    qrCode,
    workshop,
    accepted,
}: OptimizeEMailProps) {
    const second_day = accepted && workshop !== "None";
    return (
        <Html>
            <Head />
            <Tailwind>
                <Body className="bg-white font-sans font-semibold">
                    <Container className="border border-solid border-[#eaeaea] rounded p-6 items-center">
                        <Section>
                            <Img
                                src="https://www.optimize-jijel.org/_next/image?url=%2Foptimize_logo.png&w=128&q=100"
                                className="mx-auto"
                            />
                            <Heading className="text-center underline">
                                OPTIMIZE INVITATION
                            </Heading>
                        </Section>
                        <Section>
                            <Text>
                                🔸Greetings
                                <strong className="capitalize">
                                    {" "}
                                    {full_name}
                                </strong>{" "}
                                🫡,
                            </Text>
                            <Text>
                                It has been a while, huh? 🙂 I am delighted to
                                extend an invitation to you for Optimize second
                                edition. Please remember to bring your
                                enthusiasm and excitement 👜 and ensure a good
                                night&apos;s rest 🛌. The event will be lit, it
                                promises to be engaging, blending education and
                                enjoyment. I&apos;m really looking forward to
                                seeing you there!
                            </Text>
                        </Section>
                        <Section>
                            <Row>
                                <Column className="w-1/2">
                                    <Text className="mx-auto text-3xl font-bold bg-yellow-500 text-white rounded-full w-24 h-24 flex text-center items-center">
                                        1st Day
                                    </Text>
                                </Column>
                                <Column className="text-center w-1/2">
                                    <Row>
                                        <strong>Location:</strong> House of
                                        Culture
                                    </Row>
                                    <Row>
                                        <strong>Activity:</strong> Conference
                                    </Row>
                                    <Row>
                                        <strong>Date:</strong> 24 Dec, 2023
                                    </Row>
                                </Column>
                            </Row>

                            {second_day && (
                                <Row>
                                    <Column className="w-1/2">
                                        <Text className="mx-auto text-3xl font-bold bg-yellow-500 text-white rounded-full w-24 h-24 flex text-center items-center">
                                            2st Day
                                        </Text>
                                    </Column>
                                    <Column className="text-center w-1/2">
                                        <Row>
                                            <strong>Location:</strong> Bourmel,
                                            CLS
                                        </Row>
                                        <Row>
                                            <strong>Workshop:</strong>{" "}
                                            {workshop
                                                .split(" ")
                                                .splice(0, 3)
                                                .join(" ")}
                                        </Row>
                                        <Row>
                                            <strong>Date:</strong> 25 Dec, 2023
                                        </Row>
                                    </Column>
                                </Row>
                            )}
                        </Section>
                        <Section>
                            <Text>
                                🔸Oh, I almost forgot 😅. While navigating
                                through our database, I accidentally 🥲 sent
                                some emails and stumbled upon something
                                pertaining to you🤭. Please accept it—I am sure
                                you will need it🤫:
                            </Text>
                            <Text className="border border-solid border-[#eaeaea] rounded-xl text-center py-4 text-lg">
                                <strong>{id}</strong>
                            </Text>
                            <Text>
                                🔸Consequently, I assume your appearance
                                resembles this 📸...
                            </Text>
                            <Img
                                src={qrCode}
                                className="w-64 h-64 mx-auto"
                            ></Img>
                            <Text>
                                🔸Lastly,🤔 ... I acknowledge that you might be
                                wondering about the identity behind the use of
                                &apos;I&apos; and the purpose. Well,🙃 for
                                certain reasons, I am unable to disclose my
                                identity🫠.... but I assure you, we will meet in
                                the third edition😉. I give you my word.
                                Farewell, friend.👋
                            </Text>
                        </Section>
                        <Hr />
                        <Row className="text-center">
                            <Column className="w-1/3 ">
                                <Link href="https://www.instagram.com/optimize.jijel/">
                                    Instagram
                                </Link>
                            </Column>
                            <Column className="w-1/3">
                                <Link href="https://www.facebook.com/optimize.jijel">
                                    Facebook
                                </Link>
                            </Column>
                            <Column className="w-1/3">
                                <Link href="https://www.linkedin.com/company/optimize-association/">
                                    Linked In
                                </Link>
                            </Column>
                        </Row>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
