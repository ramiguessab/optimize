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
                                🔸Dear Optimize Enthusiast
                                <strong className="capitalize">
                                    {" "}
                                    {full_name}
                                </strong>{" "}
                                🫡, I hope this message finds you buzzing with
                                excitement and ready for an extraordinary
                                experience! 🌟
                            </Text>
                            <Text>
                                🔸Congratulations, you&apos;ve secured your spot
                                for the Optimize Jijel Second Edition on Sunday,
                                December 24th, where we&apos;ll be diving deep
                                into the fascinating realm of &puot;Exploring
                                AI: The New Frontiers of science&puot; Your
                                Schedule:
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
                                🔸Let me introduce an innovative check-in
                                process ! 🎟 here is your personalized QR code .
                                Simply present it during check-in for swift
                                access to all the exciting activities:
                            </Text>
                            <Text className="border border-solid border-[#eaeaea] rounded-xl text-center py-4 text-lg">
                                <strong>{id}</strong>
                            </Text>
                            <Img
                                src={qrCode}
                                className="w-64 h-64 mx-auto"
                            ></Img>
                            <Text>
                                🔸Now, let&apos;s address the mysterious
                                &apos;I&apos; in this email. 🕵️ For various
                                reasons, I can&apos;t reveal my identity just
                                yet... but stay tuned, as I look forward to
                                meeting you in the third edition! 😉 Your
                                journey with Optimize is just beginning.
                            </Text>
                            <Text>
                                🔸 Thank you for being a part of Optimize
                                Jijel&apos;s vibrant community! 🙌 I can&apos;t
                                wait to make this edition an unforgettable
                                experience for you dear optimizer. See you at
                                Optimize Jijel Second Edition—where the future
                                meets innovation!
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
