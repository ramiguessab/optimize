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
    id ,
    qrCode ,
    workshop ,
}: OptimizeEMailProps) {
    return (
        <Html>
            <Head />
            <Tailwind>
                <Body className="bg-white font-sans ">
                    <Container className="border border-solid border-[#eaeaea] rounded p-6 flex flex-col items-center">
                        <Section>
                            <Img
                                src="https://www.optimize-jijel.org/_next/image?url=%2Foptimize_logo.png&w=128&q=100"
                                className="mx-auto"
                            />
                            <Heading className="text-center underline">
                                OPTIMIZE INVITATION
                            </Heading>
                        </Section>
                        <Text className="text-[14px]">
                            Ayooo What&apos;s up{" "}
                            <strong className="capitalize">{full_name}</strong>,
                        </Text>
                        <Text className="text-[14px]">
                            Long time no see huh......🙂 any ways, I am thrilled
                            to extend an invita<strong>t</strong>
                            ion to you for Optimize sec<strong>o</strong>nd
                            edition event, and guess what....🥁 you have been
                            acce
                            <strong>p</strong>ted to explore and enhance key
                            aspects of <strong>{workshop}</strong> that w
                            <strong>i</strong>
                            ll be in the 2nd day. So we really looking forward
                            to see you at house of <strong>c</strong>ulture from
                            day 24 december 2023 for the 1st day till 25
                            december 25 for the 2nd day ahhh yes i forgot...
                            while sneaking to <strong>o</strong>ur in our
                            database i found something refers to you take it i
                            am sure you will need it:{" "}
                        </Text>
                        <Text className="text-[14px] text-center border border-solid border-[#eaeaea]">
                            <strong>{id}</strong>
                        </Text>
                        <Text className="text-[14px]">
                            And according to that i suppose you look like this:
                        </Text>

                        <Img
                            src={qrCode}
                            className="mx-auto"
                            height={256}
                            width={256}
                        />
                        <Text className="text-[14px]">
                            By the way if you notice i am talking using
                            &apos;i&apos; i am sure you want to know me.... we
                            will meet in the 3rd edition i promise.
                        </Text>
                        <Text className="text-[14px]">
                            My best regards, Adios mi amigo/a!
                        </Text>
                        <Hr />
                        <Section>
                            <Link href="https://www.instagram.com/optimize.jijel/">
                                Instagram
                            </Link>
                            <Link href="https://www.facebook.com/optimize.jijel">
                                Facebook
                            </Link>
                            <Link href="https://www.linkedin.com/company/optimize-association/">
                                Linked In
                            </Link>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}
